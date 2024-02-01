const { exit } = require('process');
const auth = require('../auth/auth');
const {GraphQLError} = require('graphql/error');
const {loginReqGql} = require('../auth/auth');
const middleware = require('../middlewares');
const { session, driver } = require('../config/db'); 
// TODO : validate input
const resolvers = {
  Query: {
    hello: (root, args, { req,res }) => {
      return 'World'
    },
    auth_test:  (root, args, { req,res }) => {
      loginReqGql(req,res);

      return 'auth';
    
    },

    // *User resolvers ================================================================================================
    
    getUser: async (root, args, { req,res }) => {
      // loginReqGql(req,res);
      let attrQuery = "";
      let connQuery = "";
      if (!args.username && !args.id) return new GraphQLError("invalid input");
      if (args.username)  attrQuery = `{username:"${args.username}"}`;
      else if (args.id) connQuery = ` WHERE id(u)=${args.id} `;
      try {
        const result = await session.run(`MATCH (u:User${attrQuery}) ${connQuery} RETURN u, id(u) as id LIMIT 1`);
        const users = result.records.map(record => record.get('u').properties);
        users[0].id = result.records[0].get('id').toString();
        return users[0];
      } catch (error) {
        console.log(error);
        return new GraphQLError("somthing went wrong");
      }
    },
    // update later
    reactPost: async (root, args, { req,res }) => {
      // loginReqGql(req,res);
      req.user = {id:23};
      let isCreated;
      try {
        // TODO : make relation REACTED contains created_at and reaction
        const result = await session.run(`
        MATCH (u:User), (p:Post)
        WHERE id(u) = ${req.user.id} AND id(p) = ${args.postId}
        MERGE (u)-[:LIKES]->(p)
        RETURN *`).then(async results => {
          session.close();
          isCreated = results.summary.updateStatistics._stats.relationshipsCreated;
        });
        return (isCreated) ? 1 : 0;
      } catch (error) {
        console.log(error);
        return -1;
      }
    }
  }

};
  
  module.exports = {resolvers};