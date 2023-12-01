
const express = require('express');
const router = express.Router();


const mainRoute = require('./routes/main');



router.use('/', mainRoute);




module.exports = router;