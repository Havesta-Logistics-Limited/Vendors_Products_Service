const {Pool} = require('pg');
require("dotenv").config()

const pool = new Pool({
   connectionString: process.env.PRODUCT_DB_CONNECTION_STRING,
   max: 100,
   idleTimeoutMillis: 30000,
   application_name: "Havesta Products Service_db",
   connectionTimeoutMillis: 5000,
   ssl: {
      rejectUnauthorized: false, // Allows self-signed certificates
    },
})

const connectDb = () => {
   return pool.connect((err, client, release) => {
     if (err) {
       console.log("Database connection error: " + err.message);
       return null;
     }
     console.log("Database connected successfully!");
     release();
     return pool;
   });
 };


pool.on('error', (err, client) => {
   console.error('Unexpected error on idle client', err)
   process.exit(-1)
})

pool.on("end", ()=>{
   console.log("database closed")
})
module.exports = {pool, connectDb}



