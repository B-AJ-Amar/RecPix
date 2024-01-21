const {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
  } =  require("graphql");


  
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

module.exports = {UserType};