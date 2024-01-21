const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} =  require("graphql");

/*
the lats thing tha i did is decide to use GraphQLObjectType instead of buildSchema

app.use('/graphql', graphqlHTTP((req) => ({
  ...
  context: { req },  // Pass the entire req object  to context

  const resolvers = {
  Query: {
    getUser: (parent, args, context) => {
      const { req } = context;
      ? authMiddleware(req);
      .....
  },
};
})));

*/

// TODO : switch form rest to graphql
// *=======================================
const testUsers = [
    { email: 'user1@example.com', created: '2022-01-18', username: 'user1', password: 'password1' },
    { email: 'user2@example.com', created: '2022-01-19', username: 'user2', password: 'password2' },
    { email: 'user3@example.com', created: '2022-01-20', username: 'user3', password: 'password3' }
  ];
  

const {UserType} = require("./TypeDefs/UserType");

// *=======================================
// quary : get
const RootQuery = new GraphQLObjectType({
    name: "Query",
    fields: {
      getAllUsers: {
        type: new GraphQLList(UserType),
        args: { id: { type: GraphQLInt } },
        resolve(parent, args) {
          return testUsers;
        },
      },
    },
  });
  
// Mutation : post|delete|put ....
  const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createUser: {
        type: UserType,
        args: {
          firstName: { type: GraphQLString },
          lastName: { type: GraphQLString },
          email: { type: GraphQLString },
          password: { type: GraphQLString },
        },
        resolve(parent, args) {
            testUsers.push({
            id: testUsers.length + 1,
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            password: args.password,
          });
          console.log(args)
          return args;
        },
      },
    },
  });
  

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });