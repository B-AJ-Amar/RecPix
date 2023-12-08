const express = require('express');
const router = express.Router();
const { session, driver } = require('../config/db'); 

// Define routes for users

router.get('/', async (req, res) => {
  try {
    const result = await session.run('MATCH (u:User{username:"terreget"}) RETURN u');
    const users = result.records.map(record => record.get('u').properties);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


router.delete('/', async (req, res) => {
  let username = body.username;
  try {
    const result = await session.run('MATCH (u:User{username:"terreget"}) RETURN u');
    const users = result.records.map(record => record.get('u').properties);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});




module.exports = router;