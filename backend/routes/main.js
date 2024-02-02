const express = require('express');
const router = express.Router();
const { session, driver } = require('../config/db'); 
const middleware = require('../middlewares');
const auth = require('../auth/auth');
const {timezone, defaultUserImgPath } = require("../config/settings");

// middlewares for signup
const signupMid = [
  middleware.validate_username,
  middleware.validate_password,
  middleware.validate_email,
]

//? Home =====================================================================================

// Define routes for users
router.get('/',auth.loginRequired, (req, res) => {
  // return res.render('index');
  // i will use fake data for now
  return res.json({"data":[
    { "id":1,
      "img":"http://localhost:3000/static/images/img-1.jpg"
    },
    { "id":2,
      "img":"http://localhost:3000/static/images/img-2.jpg"
    },
    { "id":3,
      "img":"http://localhost:3000/static/images/img-3.jpg"
    },
    { "id":4,
      "img":"http://localhost:3000/static/images/img-4.jpg"
    },
    { "id":5,
      "img":"http://localhost:3000/static/images/img-5.jpg"
    },
    { "id":6,
      "img":"http://localhost:3000/static/images/img-6.jpg"
    },
    { "id":11,
      "img":"http://localhost:3000/static/images/img-1.jpg"
    },
    { "id":12,
      "img":"http://localhost:3000/static/images/img-2.jpg"
    },
    { "id":13,
      "img":"http://localhost:3000/static/images/img-3.jpg"
    },
    { "id":14,
      "img":"http://localhost:3000/static/images/img-4.jpg"
    },
    { "id":15,
      "img":"http://localhost:3000/static/images/img-5.jpg"
    },
    { "id":16,
      "img":"http://localhost:3000/static/images/img-6.jpg"
    },
  ]});
});




//? signup ===================================================================================

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
    if (users1.length){ return res.status(400).json({"message":'username or email already exists'});}

    // create user
    const quary2 = await session.run(`CREATE (
        u:User{username:"${username}",
        password:"${password}",
        email:"${email}",
        img:"${defaultUserImgPath}", 
        isActive:true,
        isStaff:false,
        isSuperuser:false, 
        createdAt:datetime({timezone:"${timezone}"}) }) 
      RETURN u`);
    // const users = quary2.records.map(record => record.get('u').properties);
    res.json({"message":"user created successfully"}).status(201);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;