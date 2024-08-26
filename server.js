const {app} = require("./src/start/startup")
const PORT = process.env.PORT || 6000


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


