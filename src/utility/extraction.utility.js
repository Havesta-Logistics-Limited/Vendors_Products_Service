const jwt = require("jsonwebtoken");

const extractUserPublicId = (encodedToken) => {
  try {
    if (!encodedToken) {
      console.log("No token provided....error from (utility)");
      return;
    }
    const decodedToken = jwt.verify(token, "pass");
    return decodedToken;
  } catch (err) {
    console.log("Extract user public ID function could not decode the token");
    console.log(err.message);
  }
};


module.exports = {extractUserPublicId}