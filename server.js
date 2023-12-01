const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const routes = require('./routes');

//*config ============================================================================================================
const app = express();
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  

//* Middleware =======================================================================================================
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(session({
    secret:"secret key",
    resave: false, // don't save session if unmodified
    saveUninitialized: false // don't create session until something stored
}));


app.use((req, res, next) => {
    let now = new Date();
    console.log(`[${new Date(now).toString().slice(0,24)}] ${req.method} ${req.url}`);
    next();
  })


//* Routes ===========================================================================================================
 app.use('/', routes);