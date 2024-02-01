const { session, driver } = require('../../config/db'); 
const { timezone } = require("../../config/settings"); 
const {loginReqGql} = require('../../auth/auth');

const {GraphQLError} = require('graphql/error');



const getUser = async (root, args, { req,res }) => {
    loginReqGql(req,res);
    let attrQuery = "";
    let connQuery = "";
    if (!args.username && !args.id) return new GraphQLError("invalid input");
    if (args.username)  attrQuery = `username:"${args.username}" , `;
    else if (args.id) connQuery = ` WHERE id(u)=${args.id} `;
    try {
        const session = driver.session();
        const result = await session.run(`MATCH (u:User{ ${attrQuery} isActive:true }) ${connQuery} RETURN u, id(u) as id LIMIT 1`);
        console.log(result.summary)

        const users = result.records.map(record => record.get('u').properties);
        users[0].id = result.records[0].get('id').toString();
        return users[0];
    } catch (error) {
        console.log(error);
        return new GraphQLError("somthing went wrong");
    }
};



const followUser =  async (root, args, { req,res }) => {
    loginReqGql(req,res);
    let isCreated;
    try {
        const session = driver.session();
        const result = await session.run(`
        MATCH (u:User{ isActive:true }), (p:User{ isActive:true })
        WHERE id(u) = ${req.user.id} AND id(p) = ${args.userId}
        MERGE (u)-[:Follow {  created:datetime({timezone:"${timezone}"})  }]->(p)
        RETURN *`).then(async results => {
        isCreated = results.summary.updateStatistics._stats.relationshipsCreated;
        session.close();
        });
        return (isCreated) ? 1 : 0;
    } catch (error) {
        console.log(error);
        return -1;
    }
}



const unfollowUser =  async (root, args, { req,res }) => {
    loginReqGql(req,res);
    let isCreated;
    try {
        const session = driver.session();
        const result = await session.run(`
        MATCH (u:User{ isActive:true })-[follow:Follow]->(p:User{ isActive:true })
        WHERE id(u) = ${req.user.id} AND id(p) = ${args.userId}
        DELETE follow
        RETURN *`).then(async results => {
        session.close();
        isCreated = results.summary.updateStatistics._stats.relationshipsDeleted;
        });
        return (isCreated) ? 1 : 0;
    } catch (error) {
        console.log(error);
        return -1;
    }
}



const blockUser =  async (root, args, { req,res }) => {
    loginReqGql(req,res);
    let isCreated;
    try {
        const session = driver.session();
        const result = await session.run(`
        MATCH (u:User{ isActive:true }), (p:User{ isActive:true })
        WHERE id(u) = ${req.user.id} AND id(p) = ${args.userId}
        oOPTIONAL MATCH (u)-[block:Block]->(p)
        WHERE blok IS NULL
        MERGE (u)-[:Block {  created:datetime({timezone:"${timezone}"})  }]->(p)
        with u,p
        OPTIONAL MATCH (u)-[f1:FOLLOWS]->(p)
        OPTIONAL MATCH (p)-[f2:FOLLOWS]->(u)
        delete f1
        delete f2
        RETURN *`).then(async results => {
        isCreated = results.summary.updateStatistics._stats.relationshipsCreated;
        session.close();
        });
        return (isCreated) ? 1 : 0;
    } catch (error) {
        console.log(error);
        return -1;
    }
}

module.exports = {
    getUser,
    followUser,
    unfollowUser
}