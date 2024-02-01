const { exit } = require('process');
const auth = require('../auth/auth');
const {GraphQLError} = require('graphql/error');
const {loginReqGql} = require('../auth/auth');
const middleware = require('../middlewares');
const { session, driver } = require('../config/db'); 
const { timezone } = require("../config/settings"); 


const { getUser, followUser, unfollowUser } = require('./resolvers/user');
const  {  likePost, unlikePost } = require('./resolvers/post');

// TODO : validate input
const resolvers = {
  Query: {
    hello: (root, args, { req,res }) => {
      return 'World'
    },
    auth_test:  (root, args, { req,res }) => {
      loginReqGql(req,res);

      return 'auth';
    
    },

    // *User resolvers ================================================================================================
    
    getUser,
    
    followUser,
    unfollowUser,

    likePost,
    unlikePost,


  }

}
  
  module.exports = {resolvers};