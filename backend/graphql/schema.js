const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type User{
    name: String
    id:Int
  }
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }
  type Query {
    hello: String
    getUser:User
    random: Float!
    getDie(numSides: Int): RandomDie
    
  }
`);

module.exports = schema;
