const express = require('express');
const auth = require('../auth/auth');
const { session, driver } = require('../config/db');

const path = require('path'); // Path
const fs = require('fs'); // File System
const settings = require('../config/settings');
const middlewares = require('../middlewares');
const multer = require('multer');

const router = express.Router();

// ! akhir 7aja 9drt nsave file , mazel dynamique path
// ! lasm nchouf kifah nb3at path ll function 

// my idea is to store the file in memory temporarly and then move it to the right path after makeing some logic
const memStorePost = multer.memoryStorage()
const memUploadPost = multer({ storage: memStorePost })


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
  );
  //* save file =============================================
  
  // ? if the directory does not exist create it
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  console.log("saving file");
  fs.writeFileSync(uploadPath,fileBuffer);


  return res.json({ "message": "file uploaded" });
});

module.exports = router;