const neo4j = require('neo4j-driver');
// const sqlite3 = require('sqlite3').verbose()

// neo4j configuration ========================================================
const driver = neo4j.driver('bolt://localhost:7687');
const session = driver.session();

// sqlite3 configuration ======================================================
// const sqlDB = new sqlite3.Database('./db.sqlite3')


module.exports = { session, driver };