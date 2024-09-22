const { app } = require("./src/start/startup");
const PORT = process.env.PORT || 6000;
const { connectDb } = require("./src/database/database.config");
const sequelize = require("./src/database/sequelize.js");
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  sequelize.authenticate()
.then(()=> console.log("Database connected to Sequelize"))
.catch((err)=> console.log(`Error connecting to Sequelize ${err}`))
   const poolInstance = connectDb(); 

  // Handle graceful shutdown
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

  process.on('SIGINT', handleServerClose); // Ctrl+C
  process.on('SIGQUIT', handleServerClose); // Quit signal
});