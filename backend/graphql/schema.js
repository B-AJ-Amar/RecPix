const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Query {
    hello: String
    random: Float!
    rollDice(numDice: Int!, numSides: Int): [Int]
    
  }
`);

module.exports = schema;
