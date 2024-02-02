// this file contains the global settings for the backend. (like django settings.py)

const baseDir = `${__dirname}/..` ;
const port = 3000;
const origin = `http://localhost:${port}`;

const timezone="Greenwich";

// JWT ========================================================
const jwtSecret = 'e0fb385c27f800fbb82fce3d7515c82e116277e25a95dc2a3d399162f220ece6431be2ebe112316165f4859d9cbdfd85f16c903951971dddb8a9d92d614e6b0c' ;
const jwtAcssesTokenExpireTime = '9999999s' ; // 1800 = 30 min //! i will make it larger for testing 9999999s = 115 days
const jwtRefreshTokenExpireTime = '604800s' ; // 7 days



// neo4j ========================================================
const neoUserNode = "User";
const neoPostNode = "Post";

const neoFollowRel = "FOLLOWS";
const neoLikeRel = "LIKES";
const neoPostRel = "POSTS";
const neoBlockRel = "BLOCKS";



// ========================================================================================================

module.exports = {
    baseDir,
    port,
    origin,
    timezone,
    jwtSecret,
    jwtAcssesTokenExpireTime,
    jwtRefreshTokenExpireTime,

    // neo4j variables 
    neoUserNode,
    neoPostNode,
    neoFollowRel,
    neoLikeRel,
    neoPostRel,
    neoBlockRel


}