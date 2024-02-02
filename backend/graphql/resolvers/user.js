const { session, driver } = require('../../config/db'); 
const { timezone,neoBlockRel,neoUserNode } = require("../../config/settings"); 
const {loginReqGql} = require('../../auth/auth');

const {GraphQLError} = require('graphql/error');



const getUser = async (root, args, { req,res }) => {
    loginReqGql(req,res);
    let attrQuery = "";
    let connQuery = "";
    if (!args.username && !args.id) return new GraphQLError("invalid input");
    if (args.username)  attrQuery = `username:"${args.username}" , `;
    else if (args.id) connQuery = ` WHERE id(u)=${args.id} `;

    const session = driver.session();
    return await session.run(`
    MATCH (u:${neoUserNode}{ ${attrQuery} isActive:true }) ${connQuery} 
    RETURN u, id(u) as id 
    LIMIT 1`
    ).then(resault => {
        const users = resault.records.map(record => record.get('u').properties);
        users[0].id = resault.records[0].get('id').toString();
        return users[0];

    }).catch (error => {
        console.log(error);
        return new GraphQLError("somthing went wrong");
    })
};



const followUser =  async (root, args, { req,res }) => {
    loginReqGql(req,res);

    const session = driver.session();
    return await session.run(`
    MATCH (u:${neoUserNode}{ isActive:true }), (p:${neoUserNode}{ isActive:true })
    WHERE id(u) = ${req.user.id} AND id(p) = ${args.userId}
    MERGE (u)-[:Follow {  created:datetime({timezone:"${timezone}"})  }]->(p)
    RETURN *`
    ).then(async results => {
        let isCreated = results.summary.updateStatistics._stats.relationshipsCreated;
        
        return (isCreated) ? 1 : 0;
    }).catch (error => {
        console.log(error);
        return -1;
    })


}



const unfollowUser =  async (root, args, { req,res }) => {
    loginReqGql(req,res);

    const session = driver.session();
    return await session.run(`
        MATCH (u:${neoUserNode}{ isActive:true })-[follow:Follow]->(p:${neoUserNode}{ isActive:true })
        WHERE id(u) = ${req.user.id} AND id(p) = ${args.userId}
        DELETE follow
        RETURN *`
    ).then(async results => {
        let isDeleted = results.summary.updateStatistics._stats.relationshipsDeleted;
        
        return (isDeleted) ? 1 : 0;
    }).catch (error => {
        console.log(error);
        return -1;
    })
}


const getFollowers =  async (root, args, { req,res }) => {
    loginReqGql(req,res);
    const session = driver.session();
    return await session.run(`
    MATCH (u:${neoUserNode}{ isActive:true })-[f:${neoFollowRel}]->(p:${neoUserNode}{ isActive:true })
    WHERE id(p) = ${args.userId}
    RETURN u, id(u) as id`
    ).then(resault => {
        const users = []; 
        users = resault.records.map(record => record.get('u').properties);
        users.forEach(user => user.id = resault.records[0].get('id').toString());
        return users;
    }).catch (error => {
        console.log(error);
        return new GraphQLError("somthing went wrong");
    })
}



const blockUser =  async (root, args, { req,res }) => {
    loginReqGql(req,res);
    const session = driver.session();
    return await session.run(`
    MATCH (u:${neoUserNode} {isActive: true})-[b:${neoBlockRel}]->(p:${neoUserNode} {isActive: true})
    WHERE id(u) = ${req.user.id} AND id(p) = ${args.userId}
    RETURN b IS NOT NULL AS b`
    ).then(resault =>{
        if (resault.records.length)  return 0; // already blocked
        const session = driver.session();
        return session.run(`
            MATCH (u:${neoUserNode}{ isActive:true }), (p:${neoUserNode}{ isActive:true })
            WHERE id(u) = ${req.user.id} AND id(p) = ${args.userId}
            MERGE (u)-[:${neoBlockRel} {  created:datetime({timezone:"${timezone}"})  }]->(p)
            with u,p
            OPTIONAL MATCH (u)-[f1:FOLLOWS]->(p)
            OPTIONAL MATCH (p)-[f2:FOLLOWS]->(u)
            delete f1
            delete f2
            RETURN *`
        ).then(async results => {
            let isCreated = results.summary.updateStatistics._stats.relationshipsCreated;
            return (isCreated) ? 1 : 0;
        }).catch (error => {
            console.log(error);
            return -1;
        })

    }).catch(error =>{
        console.log(error)
        return -1
    })

}


const unblockUser =  async (root, args, { req,res }) => {
    loginReqGql(req,res);

    const session = driver.session();
    return await session.run(`
        MATCH (u:${neoUserNode}{ isActive:true })-[block:${neoBlockRel}]->(p:${neoUserNode}{ isActive:true })
        WHERE id(u) = ${req.user.id} AND id(p) = ${args.userId}
        DELETE block
        RETURN *`
    ).then(async results => {
        let isDeleted = results.summary.updateStatistics._stats.relationshipsDeleted;
        
        return (isDeleted) ? 1 : 0;
    }).catch (error => {
        console.log(error);
        return -1;
    })
}

module.exports = {
    getUser,
    getFollowers,
    followUser,
    unfollowUser,
    blockUser,
    unblockUser
}