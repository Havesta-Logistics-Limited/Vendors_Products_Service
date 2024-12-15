const { db_query } = require("../database/query");
const { responseHandler } = require("../handlers/response.handler");
const { pool } = require("../database/database.config");
const {
  calculateCommission,
  calculateFinalPrice,
} = require("../utility/commission");
const { v4: uuidv4 } = require("uuid");
const { VendorProduct } = require("../models/VendorProduts.models");
const sequelize = require("../database/sequelize");
const {VendorDatabase} = require("../database/VendorDbController")
const vendorDb = new VendorDatabase()

const test = (req, res)=>{

    res.json({message: "Server is working"})
}



const getAllProducts = async (req, res, next) => {
 console.log(req.user.PUID)
  const publicId = req.user.PUID; // Change to middleware value
  if (!publicId) {
    return responseHandler.clientError(
      res,
      "No Public ID provided. Please sign in and try again."
    );
  }
  const { page } = parseInt(req.query) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try{
    const action = await vendorDb.getAllProducts(publicId, limit, offset, page)
    if(action.success === true){
      responseHandler.success(res, action.products, action.total)
    }else{
      responseHandler.unprocessable(res, action.message)
    }
  }catch(err){
  console.log(err.message)
  }

  
};

const individualProductDetails = async (req, res, next) => {
  console.log("Entered individual function")
  const vendorId = req.user.PUID
  const { id:productId } = req.query

  if (!vendorId) {
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
  const action = await vendorDb.getIndividualProduct(vendorId, productId)
    if(action.success === true){
      responseHandler.success(res, action.product)
    }else{
      responseHandler.unprocessable(res, action.message)
    }
  } catch (err) {
    return responseHandler.unprocessable(res, err.message);
  }
};

const toggleProductStatus = async (req, res) => {
  const publicId =
    "550e8400-e29b-41d4-a716-446655440000"; /* req.user.publicId */
  const productId =
    "987e6543-e21b-43d2-b456-426614174001"; /* parseInt(req.params.productId); */
  const booleanValueFromFrontend = true; /* Get value from the body */
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
      booleanValueFromFrontend,
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
  console.log("function running");
  const publicId = req.user.PUID; /* req.user.publicId */
  const productId = uuidv4();
  const {
    productName,
    category,
    productDescription,
    originalPrice,
    quantity,
    inStock,
    productImage,
    measurement,
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
    !productImage
  ) {
    return responseHandler.clientError(
      res,
      "Missing required fields. Please provide all required details."
    );
  }
  
  try {   
    const productObject = {
      owner_public_id: publicId,
      product_public_id: productId,
      product_name: productName,
      original_price: originalPrice,
      in_stock: inStock,
      quantity_available: quantity,
      category: category,
      measurement: measurement,
      product_image: productImage,
      product_description: productDescription,
    }
    
    const action = await vendorDb.addProduct(productObject)
    console.log(action)
    if(action.success !== true){
      responseHandler.unprocessable(res, action.message)
    }

 
    responseHandler.success(res, action.product)
  } catch (err) {
    console.log(err);
    responseHandler.unprocessable(res, err.message);
  }
};

const editProduct = async (req, res) => {
  const productId = req.query.id;
  const publicId = req.user.PUID;
  const updatedFields = req.body;
 console.log(updatedFields)
  try {
   const action = await vendorDb.editProduct(publicId, productId, updatedFields)
   if(action.success !== true){
    return responseHandler.unprocessable(res, action.message);
   }
    responseHandler.success(res, action.product)
  } catch (err) {
    console.log(err.message)
  return  responseHandler.unprocessable(res, "Could not update product try again");
  } 
};

const deleteProduct = async (req, res) => {
  const productId = req.query.id;
  const vendorId = req.user.PUID;
  /* ADD A CHECK ON THE AVAVILABILITY OF BOTH CRED */
  const t = await sequelize.transaction();
  try {
    const action = await vendorDb.deleteProduct(vendorId, productId);
    if(action.success === true){
      responseHandler.ok(res, action.message);
    }else{
      responseHandler.unprocessable(res, action.message);
    }
  } catch (err) {
    console.log(err)
    await t.rollback();
  } finally {
  }
};

const filterProducts = async (req, res) => {
  const ownerId = 1234567890; /* req.user.publicId */
  const filterValue = "rice"; /* req.query.filter */
  const queryField = "product_name";

  try {
    const t = await sequelize.transaction();
    const products = await VendorProduct.findAll({
      where: { owner_public_id: "550e8400-e29b-41d4-a716-446655440000" },
    });
    console.log(...products);
    responseHandler.success(res, products);
  } catch (err) {
    responseHandler.unauthorized(res);
    console.log(err);
    await t.rollback();
  } finally {
  }
};

module.exports = {
  getAllProducts,
  individualProductDetails,
  toggleProductStatus,
  addProducts,
  editProduct,
  filterProducts,
  deleteProduct,
  test
};
