const { Router, response } = require("express");
const { db_query } = require("../database/query");
const {responseHandler}= require("../handlers/response.handler")


const getAllProducts = async (req, res, next) => {
  console.log('Function works')
  const publicId = req.user?.publicId;
  if(!publicId) {
    return responseHandler.clientError(res, "No Public ID provided. Please sign in and try again.")
  }
  const {page} = parseInt(req.query) || 1
  const limit = 10;
  const offset = (page -1) * limit;
  let client = req.client

  try {
    await client.query("BEGIN");
    const products = await client.query(db_query.GET_ALL_PRODUCTS, [limit, offset])
    res.status(200).json({status: "success", dataCount: products.rowCount, data: products.rows})
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
    if(err.code === "ECONNREFUSED" || err.code === "ENOTFOUND"){
      next(err)
    }
  } finally {
    await client.release();
  }
};

const individualProductDetails = async(req, res) => {
    const clientPublicId = req.user.publicId;
    const productId = parseInt(req.params.productId);
    if(!publicId) {
      return responseHandler.clientError(res, "User not found. Please sign in again.")
    }
    if(!productId){
      return responseHandler.clientError(res, "Product not found. Please contact support for more information")
    }
    let client;
     try{
        await client.query()
        const product = await client.query(db_query.GET_INDIVIDUAL_PRODUCT_DETAILS, [productId, clientPublicId])
        
     }catch(err){
        await client.query("ROLLBACK")
     }finally{
        await client.release();
     }
};

const toggleProductStatus = () => {};

const addProducts = () => {};

const editProduct = () => {};

const filterProducts = () => {};


module.exports = {getAllProducts, individualProductDetails, toggleProductStatus, addProducts, editProduct, filterProducts}