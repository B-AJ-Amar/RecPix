const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} =  require("graphql");;


// TODO : switch form rest to graphql
// *=======================================
const testUsers = [
    { email: 'user1@example.com', created: '2022-01-18', username: 'user1', password: 'password1' },
    { email: 'user2@example.com', created: '2022-01-19', username: 'user2', password: 'password2' },
    { email: 'user3@example.com', created: '2022-01-20', username: 'user3', password: 'password3' }
  ];
  
const UserType = new GraphQLObjectType({
    name: "User",
    fields: () =>({
        id:{type:GraphQLInt} ,
        password:{type:GraphQLString},
        email:{type:GraphQLString},
        created:{type:GraphQLString},
        username:{type:GraphQLString}

    }),

})


// *=======================================
// quary : get
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
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
            id: userData.length + 1,
            firstName: args.firstName,
            lastName: args.lastName,
            email: args.email,
            password: args.password,
          });
          return args;
        },
      },
    },
  });
  

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });