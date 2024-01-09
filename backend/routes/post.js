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
router.post('/', memUploadPost.single("image"), (req, res) => {
  const fileBuffer = req.file.buffer;
  const originalFileName = req.file.originalname;
  const fileName = `${Date.now()}_${originalFileName}`;
  const uploadDir = `uploads/`

  // ? if the directory does not exist create it
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
  fs.writeFileSync(`uploads/${fileName}`, fileBuffer);


  return res.json({ "message": "file uploaded" });


});

// ? new post =====================================================================================
// router.post('/',auth.loginRequired, async (req, res) => {
//   console.log("Hello from post");
//   console.log("from post: ",req.body,req.files);
//   //* validate title and description ============================
//   let title = middlewares.validate_text(req.body.title) || "No Title";
//   let description = middlewares.validate_text(req.body.description) || "No Description";
//   //* validate file =============================================
  
//   if (!req.files || Object.keys(req.files).length === 0) {
//     return res.status(400).send('No files were uploaded.');
//   }
//   console.log("validating file success");
//   //* save the post in database to get the id ===================
//   // % hadi akhir 7aja wsaltelha knt raya7 ncreate post w ndirou fl path ta3ou 
//   // % lazm ndir validation le tesxts \' ...
//   // % chouf NEO4j 
//   // % countires nodes 

//   const quary = await session.run(`MATCH (u:User) WHERE id(u)=${req.user.id} CREATE (u)-[posted]->(p:Post{description:"${description}",title:"${title}") RETURN p`);


//   const uploadedFile = req.files.file; // ? file name is file
//   const uploadDir = path.join(settings.baseDir , 'uploads','posts',`user-${String(req.user.id)}`); 
//   const uploadPath = path.join(uploadDir, uploadedFile.name); 

//   // ? if the directory does not exist create it
//   if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
//   }

//   // ? move the file to the directory
//   uploadedFile.mv(uploadPath, (err) => {
//     if (err) {
//       return res.status(500).send({'message':err});
//     }

//     res.status(201).json({'message':'File uploaded!'});
//   });

//   // get the post id
//   const postID = quary.records[0].get(0).identity;
//   console.log("from create post printing POST ID : ",postID.low,postID.toNumber());
//   // await session.run(`MATCH (u:User) WHERE id(u)=${req.user.id} `);
// });

module.exports = router;