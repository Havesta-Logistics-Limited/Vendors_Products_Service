const {Pool} = require('pg');
const { application_name } = require('pg/lib/defaults');
require("dotenv").config()

const pool = new Pool({
   connectionString: process.env.PRODUCT_DB_CONNECTION_STRING,
   max: 30,
   idleTimeoutMillis: 30000,
   application_name: "Havesta Products Service_db",
   connectionTimeoutMillis: 5000
})


/* pool.connect((err, client, release)=>{
   if(err){
      console.error('Error connecting to the database', err.stack)
      return
   }

   console.log('Database connected successfully!');
   release(); 
}) */


pool.on('error', (err, client) => {
   console.error('Unexpected error on idle client', err)
   process.exit(-1)
})
module.exports = {pool}



