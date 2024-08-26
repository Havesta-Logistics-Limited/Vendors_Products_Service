const {Pool} = requrie('pg')
require("dotenv").config()

const pool = new Pool({
   connectionString: process.env.PRODUCT_DB_CONNECTION_STRING
})

module.exports = {pool}



