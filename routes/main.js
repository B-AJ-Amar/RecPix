const express = require('express');
const router = express.Router();
const { session, driver } = require('../config/db'); 
const middleware = require('../middlewares');
const auth = require('../auth/auth');


// middlewares for signup
const signupMid = [
  middleware.validate_username,
  middleware.validate_password,
  middleware.validate_email,
]


// Define routes for users
router.get('/', (req, res) => {
  return res.render('index');
});


// login===================================================================================
router.get('/login', (req, res) => {
  return res.render('login');
});


router.post('/login', async (req, res) => {
  console.log(req.body);
  var username = req.username ;
  var password = req.password ;
  try {
    const result1 = await session.run(`MATCH (u:User{username:"${username}",password:"${password}}) RETURN u`);
    var users1 = result1.records.map(record => record.get('u').properties);
    if (users1.length!= 1){ return res.status(400).send('wrong username or password');}
    else{
      return res.render('index');
    }

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


// signup ===================================================================================
router.get('/signup', (req, res) => {
  return res.render('signup');
});



// signup
router.post('/signup',signupMid, async (req, res) => {
  console.log("======================",req.body);
  var username = req.valideUsername ;
  var password = req.validePassword ;
  // var password2 = req.password2 ;
  var email = req.valideEmail ;
  console.log(`signup =========\n ${username}, ${password}, ${email}`)
  // if (password !== password2) return res.status(400).send('passwords do not match');

  // hash password
  password = auth.make_password(password);

  try{
    // check if username or email already exists
    const quary1 = await session.run(`MATCH (user:User)
    WHERE user.username = "${username}" OR user.email = "${email}"
    RETURN user;`);
    var users1 = quary1.records.map(record => record.get('user').properties);
    console.log("users len ",users1.length,users1);
    if (users1.length){ return res.status(400).send('username or email already exists');}

    // create user
    const quary2 = await session.run(`CREATE (u:User{username:"${username}",password:"${password}",email:"${email}"}) RETURN u`);
    const users = quary2.records.map(record => record.get('u').properties);
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;