
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

// TODO : validate input
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