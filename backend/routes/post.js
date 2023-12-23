const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
const { session, driver } = require('../config/db');
const fileUpload = require('express-fileupload');

const path = require('path'); // Path
const fs = require('fs'); // File System

const settings = require('../config/settings');

router.use(fileUpload());

// ? new post =====================================================================================
router.post('/', async (req, res) => {

  console.log(req.body,req.files);
  //* validate title and description ============================
  let title = req.body.title || "No Title";
  let description = req.body.description || "No Description";
  title = String(title).trim();
  description = String(description).trim();
  if (!title.length) title = 'No Title';
  if (!description.length) description = 'No Description';
  //* validate file =============================================
  
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }
  
  const uploadedFile = req.files.file;
  const uploadDir = path.join(settings.baseDir , 'uploads');
  const uploadPath = path.join(uploadDir, uploadedFile.name);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  uploadedFile.mv(uploadPath, (err) => {
    if (err) {
      return res.status(500).send({'message':err});
    }

    res.status(201).json({'message':'File uploaded!'});
  });
});

module.exports = router;