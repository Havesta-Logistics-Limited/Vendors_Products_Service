
require("dotenv-flow").config()
const { app } = require("./src/start/startup");
const { connectDb } = require("./src/database/database.config");
const sequelize = require("./src/database/sequelize.js");

// Server setup
const PORT = process.env.PORT || 60000;
console.log("port")
const server = app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected to Sequelize");
  } catch (err) {
    console.error(`Error connecting to Sequelize: ${err.message}`);
  }

  const poolInstance = connectDb(); 


  const handleServerClose = () => {
    console.log("Server closing...");
    server.close(() => {
      if (poolInstance) {
        poolInstance.end(() => {
          console.log("Database connection closed");
          process.exit(0);
        });
      } else {
        process.exit(0);
      }
    });
  };
  
  process.on('SIGINT', handleServerClose); 
  process.on('SIGTERM', handleServerClose); 
});


