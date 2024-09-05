const { db_query } = require("../database/query");
const { responseHandler } = require("../handlers/response.handler");
const { pool } = require("../database/database.config");
const {
  calculateCommission,
  calculateFinalPrice,
} = require("../utility/commission");
const { v4: uuidv4 } = require("uuid");







const getAllProducts = async (req, res, next) => {
  /*  const publicId = req.user?.publicId; */
  const publicId = "3d7e8b9a-4b6c-4a8f-9d1c-5e2f7a6b9c3d"; // Change to middleware value
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

  let client = await pool.connect();

  try {
    await client.query("BEGIN");
    const products = await client.query(db_query.GET_ALL_PRODUCTS, [
      publicId,
      limit,
      0,
    ]);
    console.log(products);
    res.status(200).json({
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
  const publicId =
    "3d7e8b9a-4b6c-4a8f-9d1c-5e2f7a6b9c3d"; /* req.user.publicId */
  const productId =
    "3fcf0d3f-b248-4050-963c-7a66e166ecfb"; /* parseInt(req.params.productId); */
  const client = await pool.connect();
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
    console.log(product);
    responseHandler.success(res, product.rows[0]);
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    return responseHandler.unprocessable(res, err.message);
  } finally {
    if (client) await client.release();
  }
};

const toggleProductStatus = async (req, res) => {
  const publicId =
    "3d7e8b9a-4b6c-4a8f-9d1c-5e2f7a6b9c3d"; /* req.user.publicId */
  const productId =
    "3fcf0d3f-b248-4050-963c-7a66e166ecfb"; /* parseInt(req.params.productId); */
  const booleanValueFromFrontend = false; /* Get value from the body */
  if (typeof booleanValueFromFrontend !== "boolean") {
    return responseHandler.clientError(res, "Invalid value for toggle");
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

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const product = await client.query(db_query.TOGGLE_PRODUCT_STATUS, [
      toggleValue,
      publicId,
      productId,
    ]);
    console.log(product);
    if (product.rowCount < 1) {
      throw new Error("Could not update product status ");
    }

    await client.query("COMMIT");
    responseHandler.created(res);
  } catch (err) {
    await client.query("ROLLBACK");
    return responseHandler.unprocessable(res, err.message);
  } finally {
    await client.release();
  }
};

const addProducts = async (req, res) => {
  console.log("function running")
  const publicId =
    "7d54d22c-78a7-491a-ab7f-20eb1dececd0"; /* req.user.publicId */
  const productId = uuidv4();
  const {
    productName,
    category,
    productDescription,
    originalPrice,
    quantity,
    inStock,
    productImage,
    measurement
  } = req.body;

  if (!publicId) {
    return responseHandler.clientError(
      res,
      "User not found. Please sign in again."
    );
  }

  if (
    !productName ||
    !category ||
    !productDescription ||
    !originalPrice ||
    !quantity ||
    !inStock ||
    !productImage
  ) {
    return responseHandler.clientError(
      res,
      "Missing required fields. Please provide all required details."
    );
  }

  let client;

  const commission = calculateCommission(originalPrice);
  if (!commission) {
    return console.log("Could not calculate commission");
  }
  const finalPrice = calculateFinalPrice(originalPrice, commission);
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const product = await client.query(db_query.ADD_NEW_PRODUCT, [
      publicId,
      productId,
      productName,
      originalPrice,
      inStock,
      quantity,
      category,
      measurement,
      productImage,
      productDescription,
    ]);
    if(product.rowCount === 0){
      responseHandler.unprocessable(res, "Could not add product to inventory")
    }
    
    const finalPriceAccuracy = parseFloat(product.rows[0].final_price) === finalPrice    
    if(!finalPriceAccuracy){
      console.log("Final price was not calculated accurately")
      throw new Error("Could not add product to invetory")
    }

    await client.query("COMMIT");
    responseHandler.created(res);
  } catch (err) {
    console.log(err)
    responseHandler.unprocessable(res, err.message)
    await client.query("ROLLBACK");
  } finally {
    await client.release();
  }
};

const editProduct = async(req, res) => {
   const productId = "564a5f44-b10e-4967-9bd5-f94d20fa920c"
   const publicId = "7d54d22c-78a7-491a-ab7f-20eb1dececd0"
   const {...updatedFields} = req.body
   const queryString = db_query.EDIT_PRODUCT(updatedFields)
   const values = [...Object.values(updatedFields), productId, publicId]
   
  let client;
  try{

    client = await pool.connect()
    await client.query("BEGIN")
    const productExists = await client.query(db_query.PRODUCT_EDIT_CONFIRMATION, [productId, publicId])
    if(productExists.rowCount === 0){
      responseHandler.clientError(res, "Product not found")
      throw new Error("Product not found")
    }
    const queryResponse = await client.query(queryString, values)
    if(queryResponse.rowCount === 0){
      throw new Error("Could not update product try again")
    }
    await client.query("COMMIT")
    responseHandler.success(res, queryResponse.rows[0], queryResponse.rowCount)

  }catch(err){
    await client.query("ROLLBACK")
    responseHandler.unprocessable(res, "Could not update product try again")
    console.log(err.message)
  }finally{
   await client.release()
  }
};

const filterProducts = () => {};

module.exports = {
  getAllProducts,
  individualProductDetails,
  toggleProductStatus,
  addProducts,
  editProduct,
  filterProducts,
};
