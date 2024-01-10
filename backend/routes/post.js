const express = require('express');
const auth = require('../auth/auth');
const { session, driver } = require('../config/db');

const path = require('path'); // Path
const fs = require('fs'); // File System
const settings = require('../config/settings');
const middlewares = require('../middlewares');
const multer = require('multer');

const router = express.Router();


// my idea is to store the file in memory temporarly and then move it to the right path after makeing some logic
const memStorePost = multer.memoryStorage()
const memUploadPost = multer({ storage: memStorePost,limits: { fileSize: 1000000 } })


 // % todo :, limits: { fileSize: 1000000 }  1MB
// the basic save file function

// ? new post =====================================================================================
router.post('/',auth.loginRequired, memUploadPost.single("image"), async(req, res) => {
   //* validate title and description ============================
  let title = middlewares.validate_text(req.body.title) || "No Title";
  let description = middlewares.validate_text(req.body.description) || "No Description";

  const fileBuffer = req.file.buffer;
  const fileName = `${Date.now()}_${req.file.originalname}`;
  const uploadDir = path.join('uploads',`user-${String(req.user.id)}`,'posts'); 
  const uploadPath = path.join(uploadDir, fileName); 
  // * validate file ===========================================
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }
  //* save the post in database to get the id ===================
  const quary = await session.run(`
      MATCH (u:User) 
      WHERE id(u)=${req.user.id} 
      CREATE (u)-[:POSTED]->(p:Post{description:"${description}",title:"${title}",path:"${middlewares.validate_text(uploadPath)}"}) 
      RETURN p`
  ).then(result => {
    console.log("createing  :",result)
    if (result.records.length == 0) return res.status(400).json({ "message": "post not created" })
    //* save file =============================================
    
    // ? if the directory does not exist create it
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    console.log("saving file");
    fs.writeFileSync(uploadPath,fileBuffer);
  
  
    return res.status(201).json({ "message": "file uploaded" });

  }).catch(err =>{
    console.log("create post error : ",err)
    return res.status(400).json({ "message": "somthing went wrong" })
  });
});

// !!! i should update this (validate ID)
// ? delete post =====================================================================================
router.delete('/:id', auth.loginRequired, async (req, res) => {
  console.log("deleting post",req.params.id,req.user.id)
  let id = Number(req.params.id);
  const quary = await session.run(`
      MATCH (u:User)-[POSTED]->(p:Post) 
      WHERE id(p)=${id} AND id(u)=${req.user.id} 
      DETACH DELETE p`).then(result => {
  
        if (result.records.length == 0) return res.status(404).json({ "message": "post not found" })

    return res.json({ "message": "post deleted" })
  }).catch(err => {
    console.log("delete post error :")
    return res.status(400).json({ "message": "post not found" })
  });

});

// TODO : UPDATE

module.exports = router;