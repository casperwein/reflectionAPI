require("dotenv").config();
const Pool = require("pg").Pool;
const config = require("./config")[process.env.NODE_ENV];

const pool = new Pool(config);
console.log(config);
module.exports = {
    pool,
};