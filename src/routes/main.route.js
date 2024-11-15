const express = require("express");
const router = express.Router();
const productController = require("../controller/products.controller");
const requestHandler = require("../handlers/request.handler");
const {
  addProductValidation,
  individualProductValidation,
  productStatusValidation
} = require("../utility/requestValidation");



router.get(
  "/all_vendor_products",
  requestHandler.validate,
  productController.getAllProducts
);
   
router.get(
  "/vendor_product/:productId",
  individualProductValidation,
  requestHandler.validate,
  productController.individualProductDetails
);
router.put(
  "/vendor_product/toggle_status",
  /* productStatusValidation,
  requestHandler.validate, */
  productController.toggleProductStatus
);

router.post(
    "/add_vendor_product",
    /* addProductValidation,
    requestHandler.validate, */
    productController.addProducts
)

router.put(
  "/edit_vendor_product/:productId",
 /*  editProductValidation, */
/*   requestHandler.validate,
 */  productController.editProduct,
)

router.delete(
  "/delete_product",
  productController.deleteProduct
)

router.get(
  "/filter_products",
  productController.filterProducts
)
module.exports = { router };
