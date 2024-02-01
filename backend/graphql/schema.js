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
    reactPost(postId:Int!,reaction:Boolean!): Int
  }

`

module.exports = {typeDefs};
