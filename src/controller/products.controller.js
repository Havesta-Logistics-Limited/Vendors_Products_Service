const { db_query } = require("../database/query");
const { responseHandler } = require("../handlers/response.handler");
const {pool}= require("../database/database.config")


const getAllProducts = async (req, res, next) => {
  /*  const publicId = req.user?.publicId; */
  const publicId = "7d54d22c-78a7-491a-ab7f-20eb1dececd0"; // Change to middleware value
  console.log(publicId);
  if (!publicId) {
    return responseHandler.clientError(
      res,
      "No Public ID provided. Please sign in and try again."
    );
  }
  const { page } = parseInt(req.query) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  let client = await pool.connect()

  try {
    await client.query("BEGIN");
    const products = await client.query(db_query.GET_ALL_PRODUCTS, [
      publicId,
      limit,
      0,
    ]);
    console.log(products);
    res
      .status(200)
      .json({
        status: "success",
        dataCount: products.rowCount,
        data: products.rows,
      });
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    if (err.message === "Db_error") {
      next(err);
    }
    return responseHandler.unprocessable(res, err.message);
  } finally {
    if (client) await client?.release();
  }
};


const individualProductDetails = async (req, res, next) => {
  const publicId =  "7d54d22c-78a7-491a-ab7f-20eb1dececd0" /* req.user.publicId */;
  const productId =  "3fcf0d3f-b248-4050-963c-7a66e166ecfb" /* parseInt(req.params.productId); */
  const client = await pool.connect()
  if (!publicId) {
    return responseHandler.clientError(
      res,
      "User not found. Please sign in again."
    );
  }
  if (!productId) {
    return responseHandler.clientError(
      res,
      "Product not found. Please contact support for more information"
    );
  }
  
  try {
    await client.query("BEGIN");
    const product = await client.query(
      db_query.GET_INDIVIDUAL_PRODUCT_DETAILS,
      [productId, publicId]
    );
    console.log(product)
    responseHandler.success(res, product.rows[0])
    await client.query("COMMIT")
  } catch (err) {
    await client.query("ROLLBACK");
    return  responseHandler.unprocessable(res, err.message)
  } finally {
    if (client) await client.release();
  }
};


const toggleProductStatus = async(req, res) => {
  const publicId =  "7d54d22c-78a7-491a-ab7f-20eb1dececd0" /* req.user.publicId */;
  const productId =  "3fcf0d3f-b248-4050-963c-7a66e166ecfb" /* parseInt(req.params.productId); */
  const booleanValueFromFrontend = false  /* Get value from the body */
  if(typeof booleanValueFromFrontend !== "boolean"){
    return responseHandler.clientError(res, "Invalid value for toggle")
  }

  if (!publicId) {
    return responseHandler.clientError(
      res,
      "User not found. Please sign in again."
    );
  }
  if (!productId) {
    return responseHandler.clientError(
      res,
      "Product not found. Please contact support for more information"
    );
  }

const client = await pool.connect()
  try{
    await client.query("BEGIN")
    const product = await client.query(db_query.TOGGLE_PRODUCT_STATUS, [toggleValue, publicId, productId])
    console.log(product)
    if(product.rowCount < 1){
      throw new Error ("Could not update product status ")
    }

    await client.query("COMMIT")
    responseHandler.created(res)
  }catch(err){
    await client.query("ROLLBACK")
    return responseHandler.unprocessable(res, err.message)
  }finally{
   await client.release()
  }

};

const addProducts = () => {};

const editProduct = () => {};

const filterProducts = () => {};

module.exports = {
  getAllProducts,
  individualProductDetails,
  toggleProductStatus,
  addProducts,
  editProduct,
  filterProducts,
};
