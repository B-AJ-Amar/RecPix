const {gql } = require("apollo-server-express")

const typeDefs = gql`
  type User{
    id: ID
    username: String
    email: String
    img: String
    gender: Boolean
  }

  type Post{
    id: ID
    title: String
    content: String
    path: String
  }

  type Query {
    hello: String

    getPosts: [Post]
    getArchivedPosts: [Post]
    
    getUser(id:Int,username:String): User
    getFollowers(userId:Int!): [User]
    getFollowings(userId:Int!): [User]
    searchUsers(query:String!): [User]

    # ! mutations : (this is only for test i will fix them later)
    likePost(postId:Int!): Int
    unlikePost(postId:Int!): Int
    followUser(userId:Int!): Int
    unfollowUser(userId:Int!): Int
    blockUser(userId:Int!): Int
    unblockUser(userId:Int!): Int

  }

`

module.exports = {typeDefs};
