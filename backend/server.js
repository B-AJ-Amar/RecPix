const express = require('express');
const cookieParser = require('cookie-parser');
// const session = require('express-session');
var partials      = require('express-partials');
const path = require('path');

const routes = require('./routes');

const {port} = require('./config/settings');

//*config ============================================================================================================
const app = express();
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  

//* Middleware =======================================================================================================
app.use('/static',express.static('public'));
app.set('/media', express.static('media'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(partials()); // use partials to fix include problem

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
// app.use(session({
//     secret:"secret key",
//     resave: false, // don't save session if unmodified
//     saveUninitialized: false // don't create session until something stored
// }));


app.use((req, res, next) => {
    let now = new Date();
    console.log(`[${new Date(now).toString().slice(0,24)}] ${req.method} ${req.url}`);
    next();
  })


//* Routes ===========================================================================================================
 app.use('/', routes);