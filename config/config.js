module.exports = {
    development: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dialect: "postgres",
    },
    production: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        dialect: "postgres",
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
};