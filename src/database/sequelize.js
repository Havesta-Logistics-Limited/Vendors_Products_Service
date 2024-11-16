const { Sequelize } = require("sequelize");

const DBNAME = process.env.DATABASE_NAME
const USER = process.env.DATABASE_USER
const PASSWORD = process.env.DATABASE_PASSWORD
const HOST = process.env.DATABASE_HOST

module.exports = new Sequelize(DBNAME, USER, PASSWORD, {
    host: HOST,
    dialect: "postgres", 
    dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
    },
    pool: {
        max: 100,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
