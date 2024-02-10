
const { 
  getUser, 
  followUser, 
  unfollowUser, 
  getFollowers,
  getFollowings,
  searchUsers, 
  blockUser, 
  unblockUser 
} = require('./resolvers/user');

const  {  
  likePost, 
  unlikePost,
  getPosts,
  getArchivedPosts,
} = require('./resolvers/post');

// ! i changed the authentication to be in the middleware
// ! am note sure if this is the best way to do it
const resolvers = {
  Query: {
    hello: (root, args, { req,res }) => {
      return 'World'
    },
    // * Post resolvers ================================================================================================
    // quarries
    getPosts,
    getArchivedPosts,
    // *User resolvers ================================================================================================
    // quarries
    getUser,
    getFollowers,
    getFollowings,
    searchUsers,


    // mutations
    followUser,
    unfollowUser,

    likePost,
    unlikePost,

    blockUser,
    unblockUser


  }

}
  
  module.exports = {resolvers};