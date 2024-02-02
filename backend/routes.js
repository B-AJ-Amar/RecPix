
const express = require('express');
const router = express.Router();


const mainRoute = require('./routes/main');
const testAPIRoute = require('./routes/testAPI');
const authTokenRoute = require('./routes/authToken');
const postRoute = require('./routes/post');

router.use('/api/post', postRoute);
router.use('/api/authToken', authTokenRoute);
router.use('/api', mainRoute);
router.use('/testAPI', testAPIRoute);



module.exports = router;