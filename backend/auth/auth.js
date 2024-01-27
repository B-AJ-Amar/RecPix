const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const {session, driver} = require('../config/db.js');
const {jwtSecret,jwtAcssesTokenExpireTime,jwtRefreshTokenExpireTime} = require('../config/settings.js');

// ? JWT AUTHENTICATION ==========================================================
// $ generate tokens -----------------------------
function generateAccessToken(userID,username) {
    return jwt.sign({ id:userID,username:username,type:1 },jwtSecret, { expiresIn : jwtAcssesTokenExpireTime }); // expires in 30 min
}
function generateRefreshToken(userID,username) {
    return jwt.sign({ id:userID,username:username,type:0 },jwtSecret, { expiresIn : jwtRefreshTokenExpireTime }); // expires in 7 days
}


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

    
function isLoggedin(req, res, next) {
    if (req.user) next();
    else res.json({"message" : "you are not logged in"}).status(401);
}

// list of login required midelewares
const loginRequired = [isAuthenticated, isLoggedin];

// graphql login required middleware
const loginReqGql = (req,res,next) => {
    const nextWrapper = () => {};
    isAuthenticated(req,res,nextWrapper);
    if (!req.user) {
      const error = new Error('Not authenticated!');
    //   error.statusCode  = 401;
      throw error;
    }
  }

function authenticate(username,password) {
    if (password == null || username == null) return 0;
    var password = String(password);
    var username = String(username);
    var query = `MATCH (user:User {username:"${username}", password:"${ crypto.createHash('md5').update(password).digest('hex')}"}) RETURN user`;
    return session.run(query).then(result => {
        if (result.records.length == 0) return null;
        else{
            console.log(result.records[0].get(0));
            return result.records[0].get(0);  
        } 
    });  
}
// hash password with md5 ======================================================
function make_password(password) {
    if (password == null){ return 0;}
    return crypto.createHash('md5').update(String(password)).digest('hex');
}



module.exports = {
    make_password,
    authenticate,
    isAuthenticated,
    generateAccessToken,
    generateRefreshToken,
    loginRequired,
    loginReqGql
}