const express = require('express');
const router = express.Router();

// Define routes for users
router.get('/', (req, res) => {
  return res.render('index');
});

router.get('/login', (req, res) => {
  return res.render('login');
});
router.get('/signup', (req, res) => {
  return res.render('signup');
});

module.exports = router;