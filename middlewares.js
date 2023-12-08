function validate_username(req,res,next) {
    const usernameRegex = /^[a-zA-Z0-9_-]{3,}$/;
    const username = req.body.username || null;
    if (username == null) return  res.status(400).send('empty input');

    if (username.match(usernameRegex)){
        req.valideUsername = username;
        next();
    } 
    else res.status(400).send('invalid username');

}

function validate_email(req,res,next) {
    console.log(req.body);
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    const email = req.body.email || null;
    if (email == null) return  res.status(400).send('empty input');
    if (email.match(emailRegex)){
        req.valideEmail = email;
        next();
    }
    else res.status(400).send('invalid email');
}

function validate_password(req,res,next) {
    console.log(req.body);
    // procect from injection
    const password = req.body.password || null;
    if (password == null) return  res.status(400).send('empty input');
    if (password.length < 8) return res.status(400).send('password too short');
    req.validePassword = password;
    next();
}

module.exports = {
    validate_username,
    validate_email,
    validate_password
}