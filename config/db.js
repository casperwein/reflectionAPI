const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "ReflectionAPI",
    password: "mydatabase",
    port: 5432,
});

module.exports = pool;