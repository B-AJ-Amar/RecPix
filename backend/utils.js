const auth = require('../auth/auth');
const { session, driver } = require('../config/db');
const fileUpload = require('express-fileupload');

const path = require('path'); // Path
const fs = require('fs'); // File System
const settings = require('../config/settings');
const middlewares = require('../middlewares');




// ! the las thing that i find before sleep is this quary 
/* 
WITH [0, 1, 2, 3, 4, 5] AS Ids
MATCH (p:post) WHERE id(p) = 253

WITH Ids, p
UNWIND Ids AS userId
MATCH (u:User) WHERE id(u) = userId
CREATE (u)-[:LIKES]->(p);
*/

// function createPost(user,post,categories=null){
//     if (user == null || post == null) return null;

   
//     const quary = `
//     MATCH 
//         (u:User) WHERE id(u)=${user.id} 
//     CREATE 
//         (u)-[posted]->(p:Post{description:"${post.description}",title:"${post.title}"}) 
    
//     RETURN u
//     `;
// }
