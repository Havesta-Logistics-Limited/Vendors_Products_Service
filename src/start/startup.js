require("dotenv-flow").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { router } = require("../routes/main.route");
const { responseHandler } = require("../handlers/response.handler");
const { pool } = require("../database/database.config");
const { errorMiddleware } = require("../handlers/middlewareError.handler");

const app = express();
// Middleware for CORS, JSON parsing, and cookies
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://client-portal-v1.onrender.com",
      "https://nginx-configuration-4f3p.onrender.com",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());


app.use("/vendor_service/api/products", router);
app.use(errorMiddleware.globalErrorHandler);
app.all("*", errorMiddleware.globalNotFoundHandler);

module.exports = { app };
