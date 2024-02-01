const {gql } = require("apollo-server-express")

const typeDefs = gql`
  type User{
    id: ID
    username: String
    email: String
    img: String
    gender: Boolean
  }

  type Query {
    hello: String
    auth_test: String
    getUser(id:Int,username:String): User
    likePost(postId:Int!): Int
    unlikePost(postId:Int!): Int
    followUser(userId:Int!): Int
    unfollowUser(userId:Int!): Int
  }

`

module.exports = {typeDefs};
