require("dotenv-flow").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { router } = require("../routes/main.route");
const { responseHandler } = require("../handlers/response.handler");
const { pool } = require("../database/database.config");
const { errorMiddleware } = require("../handlers/middlewareError.handler");

const app = express();


// Middleware for JSON parsing and cookies
app.use(express.json());
app.use(cookieParser());

// Log incoming requests (optional)
app.use((req, res, next) => {
  console.log("Request entered the app");
  next();
});

// Routes
app.use("/vendors_service/api/products", router);

// Error Handling
app.use(errorMiddleware.globalErrorHandler);
app.all("*", errorMiddleware.globalNotFoundHandler);

module.exports = { app };
