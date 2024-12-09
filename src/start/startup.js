require("dotenv-flow").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { router } = require("../routes/main.route");
const { responseHandler } = require("../handlers/response.handler");
const { pool } = require("../database/database.config");
const { errorMiddleware } = require("../handlers/middlewareError.handler");

const app = express();

/* if(process.env.CODE_ENV !== 'production'){
  app.use(cors({
    origin: "http://localhost:8080", 
    credentials: true, 
   
  }))
} */
// Middleware for JSON parsing and cookies
app.use(cookieParser());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));



// Log incoming requests (optional)

// Routes
app.use("/vendors_service/api/products", router);

// Error Handling
app.use(errorMiddleware.globalErrorHandler);
app.all("*", errorMiddleware.globalNotFoundHandler);

module.exports = { app };
