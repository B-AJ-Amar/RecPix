const crypto = require("crypto");



function make_password(password) {
    if (password == null){ return 0;}
    return crypto.createHash('md5').update(String(password)).digest('hex');
}


function authenticate(username,password) {
    if (password == null || username == null) return 0;
    var password = String(password);
    var username = String(username);

    
}

module.exports = {
    make_password,
    authenticate
}