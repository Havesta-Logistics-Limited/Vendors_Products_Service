const express  = require("express")
const router = express.Router()
const productController = require("../controller/products.controller");



router.get("/all_vendor_products", productController.getAllProducts)
router.get("/vendor_product/:id", productController.individualProductDetails)
router.put("/vendor_product/toggle_status", productController.toggleProductStatus)



module.exports = {router}