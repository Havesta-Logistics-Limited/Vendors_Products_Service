const { pool } = require("../database/database.config");
const { responseHandler } = require("../handlers/response.handler");

const errorMiddleware = {
  handleDatabaseConnection: async (err, req, next) => {
    
  },

  globalNotFoundHandler: (req, res, next) => {
    console.log(req.originalUrl)
    return responseHandler.notfound(
      res,
     req.originalUrl
    );
  },

  globalErrorHandler: (err, req, res, next) => {
    console.error(err);
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


  shareDatabaseConnection: (req, res, next)=>{

  }
};

module.exports = { errorMiddleware };
