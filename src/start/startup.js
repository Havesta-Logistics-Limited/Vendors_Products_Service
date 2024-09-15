const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { router } = require('../routes/main.route');
const { responseHandler } = require('../handlers/response.handler');
const { pool } = require('../database/database.config');
const {errorMiddleware}= require("../handlers/middlewareError.handler")

const app = express();
// Middleware for CORS, JSON parsing, and cookies
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());








//Error handlers and database connection
/* app.use(async(err, req, res, next)=>{
    const client = await pool.connect()
   
    req.client = client
    next()
}); */
app.use('/api/v1/products', router);
app.use(errorMiddleware.globalErrorHandler);
app.all('*', errorMiddleware.globalNotFoundHandler);

module.exports = { app };
