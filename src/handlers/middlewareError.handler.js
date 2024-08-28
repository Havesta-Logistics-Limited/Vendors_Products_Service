const { pool } = require("../database/database.config");
const { responseHandler } = require("../handlers/response.handler");

const errorMiddleware = {
  handleDatabaseConnection: async (req, res, next) => {
    try {
      const client = await pool.connect();
      req.client = client; // Attach client to request for use in routes
      next();
    } catch (err) {
      next(err); // Pass the error to the error handling middleware
    }
  },

  globalNotFoundHandler: (req, res, next) => {
    return responseHandler.notfound(
      res,
      "Resource not found, contact support for help"
    );
  },

  globalErrorHandler: (err, req, res, next) => {
    if (
      err.code === "ECONNREFUSED" ||
      err.code === "ENOTFOUND" ||
      err.severity === "FATAL"
    ) {
      return responseHandler.networkError(
        res,
        "Connection to the server has failed, please try again or check back later"
      );
    }
  },
};

module.exports = { errorMiddleware };
