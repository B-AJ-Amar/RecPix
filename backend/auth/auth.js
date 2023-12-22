const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const {session, driver} = require('../config/db.js');

const jwtSecret = 'e0fb385c27f800fbb82fce3d7515c82e116277e25a95dc2a3d399162f220ece6431be2ebe112316165f4859d9cbdfd85f16c903951971dddb8a9d92d614e6b0c' ;
const jwtAcssesTokenExpireTime = '1800s' ; // 30 min
const jwtRefreshTokenExpireTime = '604800s' ; // 7 days
// ? JWT AUTHENTICATION ==========================================================
// $ generate tokens -----------------------------
function generateAccessToken(username) {
    return jwt.sign({ username: username,type:1 },jwtSecret, { expiresIn : jwtAcssesTokenExpireTime }); // expires in 30 min
}
function generateRefreshToken(username) {
    return jwt.sign({ type:0,username: username },jwtSecret, { expiresIn : jwtRefreshTokenExpireTime }); // expires in 7 days
}



function isAuthenticated(req, res, next) {
    // Bearer TOKEN Authorization
    let Token = req.headers['access-token'] ;
    if (Token == null) return next();

    console.log(Token);
    jwt.verify(Token, jwtSecret, (err, user) => {
        if (err) next();
        if (!user.type){
            user = null; // if the user use refresh token
            next();
        }
        console.log(user,user.type);
        req.user = user; // like request.user in django
        next();
    })
}

    
function isLoggedin(req, res, next) {
    if (req.user) next();
    else res.json({"message" : "you are not logged in"}).status(401);
}
// list of login required midelewares
const loginRequired = [isAuthenticated, isLoggedin];


function authenticate(username,password) {
    if (password == null || username == null) return 0;
    var password = String(password);
    var username = String(username);
    var query = `MATCH (user:User {username:"${username}", password:"${ crypto.createHash('md5').update(password).digest('hex')}"}) RETURN user`;
    return session.run(query).then(result => {
        if (result.records.length == 0) return null;
        else{
            console.log(result.records[0].get(0).properties);
            return result.records[0].get(0).properties;  
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
    loginRequired
}