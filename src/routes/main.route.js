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
  "/vendor_product/:id",
  individualProductValidation,
  requestHandler.validate,
  productController.individualProductDetails
);
router.put(
  "/vendor_product/toggle_status",
  productStatusValidation,
  requestHandler.validate,
  productController.toggleProductStatus
);

router.post(
    "/add_vendor_product",
    addProductValidation,
    requestHandler.validate,
    productController.addProducts
)

module.exports = { router };
