// this file contains the global settings for the backend. (like django settings.py)

const baseDir = __dirname ;
const port = 3000;
const origin = `http://localhost:${port}`;


const jwtSecret = 'e0fb385c27f800fbb82fce3d7515c82e116277e25a95dc2a3d399162f220ece6431be2ebe112316165f4859d9cbdfd85f16c903951971dddb8a9d92d614e6b0c' ;
const jwtAcssesTokenExpireTime = '1800s' ; // 30 min
const jwtRefreshTokenExpireTime = '604800s' ; // 7 days



module.exports = {
    baseDir,
    port,
    origin,

    jwtSecret,
    jwtAcssesTokenExpireTime,
    jwtRefreshTokenExpireTime,

}