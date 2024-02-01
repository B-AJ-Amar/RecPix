const express      = require('express');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
var partials       = require('express-partials');
const path         = require('path');

const routes       = require('./routes');
const {port}       = require('./config/settings');
// for offline development
// const {ApolloServerPluginLandingPageGraphQLPlayground} = require("apollo-server-core");

//*config ============================================================================================================
const {ApolloServer} = require("apollo-server-express")
const {typeDefs}     = require("./graphql/schema")
const {resolvers}    = require("./graphql/resolvers")

// //! there is a problem in this verion of apollo server i found this solution and i will use ti temporarely
const server = new ApolloServer({ 
  typeDefs,
  resolvers ,
  context: ({ req, res,next }) => ({req,res,next}),
  formatError: (error) => {
    const { message, path } = error;
    return { message, path };
  },
 } );
// plugins: [
//   ApolloServerPluginLandingPageGraphQLPlayground(),
// ]
async function startServer() {
  await server.start();
  const app =  express();

  server.applyMiddleware({ app,path:"/graphql" });

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}\nGraphql server on http://localhost:${port}/graphql`);
  });
  
  //* Middleware =======================================================================================================
app.use('/static',express.static('public'));
app.set('/media', express.static('media'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(partials()); // use partials to fix include problem

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// app.use(express.urlencoded());
app.use(cookieParser());


app.use((req, res, next) => {
    let now = new Date();
    console.log(`[${new Date(now).toString().slice(0,24)}] ${req.method} ${req.url}`);
    next();
  })


  //* Routes ===========================================================================================================
  app.use('/', routes); //HTTP
  
  
  
  
  
  //  *===============================================================================
}
  startServer();
