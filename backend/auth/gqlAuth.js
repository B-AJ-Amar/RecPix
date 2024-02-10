const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const {session, driver} = require('../config/db.js');
const {jwtSecret,jwtAcssesTokenExpireTime,jwtRefreshTokenExpireTime} = require('../config/settings.js');


function isAuthenticated(req, res, next) {
    // Bearer TOKEN Authorization
    let Token = req.headers['access-token'] ;
    if (Token == null) return next();
    jwt.verify(Token, jwtSecret, (err, user) => {
        if (err != null ) {return next();}

        if (!user.type){
            user = null; // if the user use refresh token
            next();
        }
 
        req.user = user;
        next();
    })
}


function gqlLoginRequired(req, res, next) {
    if (!req.user) {
        const error = new Error('Not authenticated!');
      //   error.statusCode  = 401;
        throw error;
      }
}

module.exports = {
    isAuthenticated,
    gqlLoginRequired
}