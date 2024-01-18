const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLNonNull,
} = require('graphql');


/*
in graphql there is :
  quary : get
  mutation : post|delete|put ...
*/
const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    // Add more fields as needed
  },
});

const RootQuary = new GraphQLObjectType({
  name: "RootQuary",
  fields:{

  }

})



const resolvers = {
    hello: () => {
      return 'world';
    },
    random:() =>{
      return Math.random();
    },
    rollDice:args =>{
      return [args.numSides,args.numDice]
    }

  };
  
  module.exports = resolvers;