
const express = require('express');
const router = express.Router();


const mainRoute = require('./routes/main');
const userRoute = require('./routes/user');
const testAPIRoute = require('./routes/testAPI');
const authTokenRoute = require('./routes/authToken');


router.use('/api/authToken', authTokenRoute);
router.use('/api', mainRoute);
router.use('/user', userRoute);
router.use('/testAPI', testAPIRoute);



module.exports = router;