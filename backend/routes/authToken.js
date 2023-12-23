const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');

// ? Login =====================================================================================
router.post('/login', async (req, res) => {
    console.log(req.body);
    var username = req.body.username ;
    var password = req.body.password ;
    if (password == null || username == null) return res.status(400).send('empty input');
    console.log(`login =========\n ${username}, ${password}`)
    auth.authenticate(username,password).then(user => {
      if (user == null) return res.json({message : 'wrong username or password'}).status(400);
      else{
        console.log("authentification success");
        let accessToken = auth.generateAccessToken(user);
        let refreshToken = auth.generateRefreshToken(user);
        // TODO:refresh token
        return res.json({'access-token': accessToken,'refresh-token': refreshToken}).status(200);
      }
    });
  
  });


router.post('/refreshToken',auth.loginRequired, (req, res) => {
    // validate the refresh token
    let refreshToken = req.body['refresh-token'];
    console.log(refreshToken);
    let authToken = auth.generateAccessToken(req.user.username);
    return res.json({'access-token': authToken}).status(200);
  
  });


module.exports = router;