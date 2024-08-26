const { extractUserPublicId } = require("../utility/extraction.utility");
const auth = async (req, res, next) => {
  try {
    const token = req.get("user_profile_cookie");
    if (!token) {
      throw new Error("Token Invalid or unprovided, please sign in again");
    }



    const userPublicId = await extractUserPublicId(token);
    if (!userPublicId) {
      throw new Error("The Public Id of the user could not be extracted");
    }
    req.user = userPublicId
    //check the expiration time of the cookie before calling next

    next();
  } catch (err) {
    res.status(403).json({ status: "failed", message: err.message });
  }
};
