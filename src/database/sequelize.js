const { Sequelize } = require("sequelize");

module.exports = new Sequelize("havesta_vendors_db", "havesta", "4wqdhJvkQC2cwKwQgGXgqQP5x1djcpjh", {
    host: "dpg-crmv1fjtq21c73arjrd0-a.oregon-postgres.render.com",
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
