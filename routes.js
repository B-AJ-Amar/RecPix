
const express = require('express');
const router = express.Router();


const mainRoute = require('./routes/main');
const userRoute = require('./routes/user');



router.use('/', mainRoute);
router.use('/user', userRoute);



module.exports = router;