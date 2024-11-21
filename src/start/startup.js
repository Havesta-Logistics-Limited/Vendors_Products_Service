require("dotenv-flow").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { router } = require("../routes/main.route");
const { responseHandler } = require("../handlers/response.handler");
const { pool } = require("../database/database.config");
const { errorMiddleware } = require("../handlers/middlewareError.handler");


const app = express();

app.use((req, res, next) => {
  console.log("Request entered the app")
 
  next();
});
// Middleware for CORS, JSON parsing, and cookies
app.use(
  cors({
    origin: [
      "http://localhost:8080",
      "https://client-portal-v1.onrender.com",
      "https://nginx-configuration-4f3p.onrender.com",
    ],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]

  })
);

/* app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(204); // No content for preflight request
}); */
app.use(express.json());
app.use(cookieParser());


app.use("/vendor_service/api/products", router);
app.use(errorMiddleware.globalErrorHandler);
app.all("*", errorMiddleware.globalNotFoundHandler);

module.exports = { app };
