const {Pool} = require('pg');
require("dotenv").config()

const pool = new Pool({
   connectionString: "postgresql://havesta:4wqdhJvkQC2cwKwQgGXgqQP5x1djcpjh@dpg-crmv1fjtq21c73arjrd0-a.oregon-postgres.render.com/havesta_vendors_db",
   max: 100,
   idleTimeoutMillis: 30000,
   application_name: "Havesta Products Service_db",
   connectionTimeoutMillis: 5000,
   ssl: {
      rejectUnauthorized: false, 
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



