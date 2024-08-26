const { Router, response } = require("express");
const { pool } = require("../database/database.config");
const { db_query } = require("../database/query");
const {responseHandler}= require("../handlers/response.handler")


const getAllProducts = async (req, res) => {
  const publicId = req.user.publicId;
  let client;
  try {
    client = await pool.connect();
    await client.query("BEGIN");
    const products = await client.query(db_query.GET_ALL_PRODUCTS, [publicId])
    res.status(200).json({status: "success", dataCount: products.rowCount, data: products.rows})
    await client.query("COMMIT");
  } catch (err) {
    await client.query("ROLLBACK");
  } finally {
    await client.release();
  }
};

const individualProductDetails = async(req, res) => {
    const publicId = req.user.publicId;
    const productId = parseInt(req.params.productId);
    let client;
     try{

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
