const { session, driver } = require('../../config/db'); 
const { timezone,neoLikeRel,neoUserNode, neoPostNode } = require("../../config/settings"); 
const {loginReqGql} = require('../../auth/auth');

const {GraphQLError} = require('graphql/error');




// temporarelly i will use this function to get posts
const getPosts = async (root, args, { req,res }) => {
    loginReqGql(req,res);
    const session = driver.session();
    // where not archived
    return await session.run(`
        MATCH (p:${neoPostNode}{ isActive:true })
        
        RETURN p, id(p) as id
    `
    ).then(resault => {
        const posts = resault.records.map(record => record.get('p').properties);
        posts.forEach(post => post.id = resault.records[0].get('id').toString());
        return posts;
    }).catch (error => {
        console.log(error);
        return new GraphQLError("somthing went wrong");
    })
}

const getArchivedPosts = async (root, args, { req,res }) => {
    loginReqGql(req,res);
    const session = driver.session();
    return await session.run(`
        MATCH (p:${neoPostNode}{ isActive:true, isArchived:true })
        
        RETURN p, id(p) as id
    `
    ).then(resault => {
        const posts = resault.records.map(record => record.get('p').properties);
        posts.forEach(post => post.id = resault.records[0].get('id').toString());
        return posts;
    }).catch (error => {
        console.log(error);
        return new GraphQLError("somthing went wrong");
    })
}

const likePost = async (root, args, { req,res }) => {
    loginReqGql(req,res);
    let isCreated;

    const session = driver.session();
    return await session.run(`
        MATCH (u:${neoUserNode}), (p:${neoPostNode})
        WHERE id(u) = ${req.user.id} AND id(p) = ${args.postId}
        MERGE (u)-[:LIKES { created:datetime({timezone:"${timezone}"}) }]->(p)
        RETURN *`
    ).then(async results => {
        isCreated = results.summary.updateStatistics._stats.relationshipsCreated;
        session.close();
        return (isCreated) ? 1 : 0;
    }).catch (error => {
        console.log(error);
        return -1;
    })
}


const unlikePost = async (root, args, { req,res }) => {
    loginReqGql(req,res);
    let isCreated;

    const session = driver.session();
    return await session.run(`
        MATCH (u:${neoUserNode}{isActive:true })-[like:${neoLikeRel}]->(p:${neoPostNode}{ isActive:true })
        WHERE id(u) = ${req.user.id} AND id(p) = ${args.postId}
        DELETE like
        RETURN *`
    ).then(async results => {
        session.close();
        isCreated = results.summary.updateStatistics._stats.relationshipsDeleted;
        return (isCreated) ? 1 : 0;
    }).catch (error => {
        console.log(error);
        return -1;
    })
  
}

module.exports = {  
    likePost, 
    unlikePost,
    getPosts,
    getArchivedPosts,
};