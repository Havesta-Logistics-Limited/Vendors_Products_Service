const jwt = require("jsonwebtoken");
console.log(process.env.ACCESS_TOKEN_SECRET_KEY)
const extractUserPublicId =async (encodedToken) => {
  try {
    if (!encodedToken) {
      console.log("No token provided....error from (utility)")
      return;
    }
    const decodedToken =  await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY)
    console.log(decodedToken)
    return decodedToken;
  } catch (err) {
    console.log("Extract user public ID function could not decode the token")
    console.log(err.message);
  }
};


module.exports = {extractUserPublicId}