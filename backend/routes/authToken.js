const express = require('express');
const router = express.Router();
const auth = require('../auth/auth');
const crypto = require("crypto");
const {session, driver} = require('../config/db');
const settings = require('../config/settings');
const jwt = require('jsonwebtoken');
// ? Login =====================================================================================
router.post('/login', async (req, res) => {
    console.log(req.body);
    var username = req.body.username ;
    var password = req.body.password ;
    if (password == null || username == null) return res.status(400).send('empty input');
    console.log(`login =========\n ${username}, ${password}`)
    auth.authenticate(username,password).then(user => {
      if (user == null) return res.status(400).json({message : 'wrong username or password'});
      else{
        console.log("authentification success");
        let accessToken = auth.generateAccessToken(id=user.id, username=user.username);
        let refreshToken = auth.generateRefreshToken(id=user.id, username=user.username);
        // TODO:refresh token in cookie (httpOnly, secure, sameSite)
        res.cookie('refresh-token', refreshToken, {httpOnly: true,  sameSite: 'Strict',maxAge: settings.cookieRTMaxAge }); //secure: true,
        return res.status(200).json({'access-token': accessToken,'user': {
            id:user.id,
            username:user.username,
            email:user.email,
            img:user.img,
            isSuperuser:user.isSuperuser | false
          }
        });
      }
    });
  
  });


router.post('/refreshToken', (req, res) => {
    // validate the refresh token
    let refreshToken = req.body['refresh-token'];
    if (refreshToken == null) return res.sendStatus(401);

    jwt.verify(refreshToken, settings.jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        let authToken = auth.generateAccessToken(user.id,user.username);
        return res.status(200).json({'access-token': authToken});
    });
  
  });

module.exports = router;