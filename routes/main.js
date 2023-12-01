const express = require('express');
const router = express.Router();

// Define routes for users
router.get('/', (req, res) => {
  return res.send('Hello World!');
});

module.exports = router;