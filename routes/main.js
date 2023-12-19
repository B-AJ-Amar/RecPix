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

//? Home =====================================================================================

// Define routes for users
router.get('/',auth.loginRequired, (req, res) => {
  return res.render('index');
});


//? login===================================================================================
router.get('/login', (req, res) => {
  return res.render('login');
});


router.post('/login', async (req, res) => {
  console.log(req.body);
  var username = req.body.username ;
  var password = req.body.password ;
  if (password == null || username == null) return res.status(400).send('empty input');
  console.log(`login =========\n ${username}, ${password}`)
  auth.authenticate(username,password).then(user => {
    if (user == null) return res.status(400).send('wrong username or password');
    else{
      console.log("authentification success");
      res.cookie('access-token', auth.generateAccessToken(user.username), { maxAge: 1800000, httpOnly: true });
      return res.redirect('/');
    }
  });

});


//? signup ===================================================================================
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