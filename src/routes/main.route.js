const express = require("express");
const router = express.Router();
const productController = require("../controller/products.controller");
const requestHandler = require("../handlers/request.handler");
const autMiddleware = require("../middleware/auth.middleware")
const {
  addProductValidation,
  individualProductValidation,
  productStatusValidation
} = require("../utility/requestValidation");
const authMiddleware = require("../middleware/auth.middleware");



router.get(
  "/all_vendor_products",
  authMiddleware,
  requestHandler.validate,
  productController.getAllProducts
)

router.get(
  "/home",
  productController.test
);
   
router.get(
  "/vendor_product",
  authMiddleware,
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
    autMiddleware,
    /* addProductValidation,
    requestHandler.validate, */
    productController.addProducts
)

router.put(
  "/edit_vendor_product",
  authMiddleware,
  productController.editProduct,
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
