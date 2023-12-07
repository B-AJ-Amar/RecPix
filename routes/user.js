const express = require('express');
const router = express.Router();
const { session, driver } = require('../config/db'); 
const middleware = require('../middlewares');
// Define routes for users

const signupMid = [
  middleware.validate_username,
  middleware.validate_password
]

// signup
router.post('/signup',signupMid, async (req, res) => {
  console.log("======================",req.body);
  console.log(req.username);
  let username = req.username ;
  let password = req.password ;
  let email = req.email ;
  let password2 = req.password2 ;

  if (password !== password2) return res.status(400).send('passwords do not match');

  try{
    const result1 = await session.run(`MATCH (u:User{username:"${username}"}) RETURN u`);
    let users1 = result1.records.map(record => record.get('u').properties);
    console.log(users1.length);
    if (users1.length){ return res.status(400).send('username already exists');}

    const result2 = await session.run(`MATCH (u:User{email:"${email}"}) RETURN u`);
    let users2 = result2.records.map(record => record.get('u').properties);
    console.log(users2.length);
    if (users2.length){ return res.status(400).send('email already exists');}

    const result = await session.run(`CREATE (u:User{username:"${username}",password:"${password}",email:"${email}"}) RETURN u`);
    const users = result.records.map(record => record.get('u').properties);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.post('/login',signupMid, async (req, res) => {
    console.log(req.body);
    let username = req.username ;
    let password = req.password ;
    try {
      const result1 = await session.run(`MATCH (u:User{username:"${username}",password:"${password}}) RETURN u`);
      let users1 = result1.records.map(record => record.get('u').properties);
      if (users1.length!= 1){ return res.status(400).send('wrong username or password');}
      else{
        return res.render('index');
      }

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});


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