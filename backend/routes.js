
const express = require('express');
const router = express.Router();


const mainRoute = require('./routes/main');
const userRoute = require('./routes/user');
const testAPIRoute = require('./routes/testAPI');


router.use('/', mainRoute);
router.use('/user', userRoute);
router.use('/testAPI', testAPIRoute);



module.exports = router;