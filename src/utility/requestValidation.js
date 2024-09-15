const { body, param } = require("express-validator");

const addProductValidation = [
  body("productName")
    .exists()
    .withMessage("Product name missing")
    .isString()
    .withMessage("Product name must be a string"),
  body("quantity")
    .exists()
    .withMessage("Quantity missing")
    .isInt({ gt: 0 })
    .withMessage("Quantity must be a positive integer"),
  body("originalPrice")
    .exists()
    .withMessage("Price of product is missing")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a positive number"),
  body("productDescription")
    .exists()
    .withMessage("Product description missing")
    .isString()
    .withMessage("Field must be a string"),
  body("category")
    .exists()
    .withMessage("Category of product is missing")
    .isString()
    .withMessage("Field must be a string"),
  body("measurement")
    .exists()
    .withMessage("Measurement of product is missing")
    .isString()
    .withMessage("Field must be a string"),
  body("productImage")
    .exists()
    .withMessage("Product image missing")
    .isURL()
    .withMessage("Product image must be a valid URL"),
     body("inStock")
     .exists()
     .withMessage("In stock status missing")
     .isBoolean()
     .withMessage("In stock status must be a boolean"),

];


const individualProductValidation = [
  param("productId")
   .exists()
   .withMessage("Product ID is missing")
   .isUUID()
   .withMessage("Product ID must be a valid UUID"),
]

const productStatusValidation = [
    param("productId")
     .exists()
     .withMessage("Product ID is missing")
     .isUUID()
     .withMessage("Product ID must be a valid UUID"),
    body("inStockStatus")
     .exists()
     .withMessage("Status of product is missing")
     .isBoolean()
     .withMessage("Status must be a boolean"),
]


const editProductValidation = [
    param("productId")
     .exists()
     .withMessage("Product ID is missing")
     .isUUID()
  ]
module.exports  = {addProductValidation, individualProductValidation, productStatusValidation}