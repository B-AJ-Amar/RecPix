const { session, driver } = require('../../config/db'); 
const { timezone } = require("../../config/settings"); 
const {loginReqGql} = require('../../auth/auth');

const {GraphQLError} = require('graphql/error');


const likePost = async (root, args, { req,res }) => {
    loginReqGql(req,res);
    let isCreated;
    try {
        // TODO : make relation REACTED contains created_at and reaction
        const session = driver.session();
        const result = await session.run(`
        MATCH (u:User), (p:Post)
        WHERE id(u) = ${req.user.id} AND id(p) = ${args.postId}
        MERGE (u)-[:LIKES { created:datetime({timezone:"${timezone}"}) }]->(p)
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
const unlikePost = async (root, args, { req,res }) => {
    loginReqGql(req,res);
    let isCreated;
    try {
        const session = driver.session();
        const result = await session.run(`
        MATCH (u:User{isActive:true })-[like:LIKES]->(p:Post{ isActive:true })
        WHERE id(u) = ${req.user.id} AND id(p) = ${args.postId}
        DELETE like
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

module.exports = {  likePost, unlikePost };