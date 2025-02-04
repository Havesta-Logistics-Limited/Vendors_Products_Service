// a880829c-14f7-4f34-8c62-183eeae4b863
// http://localhost:8080/vendors/store_manager/product/promotion/add_promotion/a880829c-14f7-4f34-8c62-183eeae4b863
// 1LJo!Q!P0Y8vU8tu
// 8f3e435d-220e-4ef6-85e2-dbe467bac4b2
// 98c0bdca-b2b9-4215-b828-ce7684eef91f
// 126e15d5-f643-442b-8cb5-6337ca1bcc4e
const { db_query } = require("../database/query");
const { responseHandler } = require("../handlers/response.handler");
const { v4: uuidv4 } = require("uuid");
const { VendorProduct } = require("../models/VendorProduts.models");
const sequelize = require("../database/sequelize");
const {VendorDatabase} = require("../database/VendorDbController")
const vendorDb = new VendorDatabase()

const addPromotion = async (req, res) => {
  console.log(req.query.id, "id from params")
    console.log("function running");
    const publicId = req.user.PUID /* req.user.publicId */
    const promotionID = uuidv4();
    const {
      product_name,
      category,
      product_description,
      original_price,
      quantity_available,
      inStock,
      product_image,
      measurement,
      promo_price,
      commission,
      start_date,
      end_date
    } = req.body; 
  
    if (!publicId) {
      return responseHandler.clientError(
        res,
        "User not found. Please sign in again."
      );
    }
  
    if (
      !promo_price||
      !category ||
      !product_description ||
      !original_price ||
      !quantity_available ||
      !product_image
    ) {
      return responseHandler.clientError(
        res,
        "Missing required fields. Please provide all required details."
      );
    }
    
    try {   
      const productObject = {
        owner_public_id: publicId,
        product_public_id:req.query.id,
        promotion_public_id:promotionID,
        product_name: product_name,
        original_price: original_price,
        promo_price: promo_price,
        in_stock: inStock,
        quantity_available: quantity_available,
        category: category,
        measurement: measurement,
        product_image: product_image,
        product_description: product_description,
        commission:commission,
        start_date:start_date,
        end_date:end_date
      }
      
      const action = await vendorDb.addPromotion(productObject)
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

  const addNewPromotion = async (req, res) => {
    // console.log(req.query.id, "id from params")
      console.log("function running");
      const publicId = req.user.PUID ; /* req.user.publicId */
      const promotionID = uuidv4();
      const {
        product_name,
        category,
        product_description,
        original_price,
        quantity_available,
        inStock,
        measurement,
        product_image,
        price_description,
        promo_price,
        commission,
        start_date,
        end_date
      } = req.body; 

      console.log(price_description, "procee")
    
      // if (!publicId) {
      //   return responseHandler.clientError(
      //     res,
      //     "User not found. Please sign in again."
      //   );
      // }
    
      if (
        !promo_price||
        // !category ||
        !product_description ||
        !original_price ||
        !quantity_available ||
        !product_image
      ) {
        return responseHandler.clientError(
          res,
          "Missing required fields. Please provide all required details."
        );
      }
      
      try {   
        const productObject = {
          owner_public_id: publicId,
          // product_public_id: req.query.id,
          promotion_public_id:promotionID,
          product_name: product_name,
          original_price: original_price,
          promo_price: promo_price,
          in_stock: inStock,
          quantity_available: quantity_available,
          category: category,
          measurement: measurement,
          product_image: product_image,
          product_description: product_description,
          commission:commission,
          start_date:start_date,
          end_date:end_date
        }
        
        const action = await vendorDb.addNewPromotion(productObject)
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


  const getAllPromotions = async (req, res, next) => {
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
       const action = await vendorDb.getAllPromotion(publicId, limit, offset, page)
       console.log(action, "actionnn")
       if(action.success === true){
         responseHandler.success(res, action.promotion, action.total)
       }else{
         responseHandler.unprocessable(res, action.message)
       }
     }catch(err){
     console.log(err.message)
     }
   
     
   };

  module.exports = {addPromotion, getAllPromotions, addNewPromotion}