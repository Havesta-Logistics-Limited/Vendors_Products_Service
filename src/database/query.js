const db_query = {
  GET_ALL_PRODUCTS:
    "SELECT * FROM vendor_products WHERE owner_public_id=$1 LIMIT $2 OFFSET $3",
  GET_TOTAL_PAGES: "SELECT COUNT(*) FROM vendor_products",
  GET_INDIVIDUAL_PRODUCT_DETAILS:
    "SELECT * FROM vendor_products WHERE product_public_id= $1 AND owner_public_id=$2",
  TOGGLE_PRODUCT_STATUS:
    "UPDATE vendor_products SET in_stock= $1 WHERE owner_public_id = $2 AND product_public_id=$3",
  ADD_NEW_PRODUCT:
    "insert into vendor_products ( owner_public_id, product_public_id,  product_name,  original_price, in_stock, quantity_available, category, measurement, product_image, product_description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
  EDIT_PRODUCT: (updatedFields) => {
    return ` UPDATE vendor_products SET ${Object.keys(updatedFields)
      .map((field, index) => `${field} = $${index + 1}`)
      .join(", ")} WHERE product_public_id = $${
      Object.keys(updatedFields).length + 1
    } AND owner_public_id = $${Object.keys(updatedFields).length + 2} RETURNING product_image, product_name, original_price, final_price, product_public_id, product_description, in_stock`;
  },
  DELETE_PRODUCT: "DELETE FROM vendors_products WHERE owner_public_id = $1 AND product_public_id = $2",
  PRODUCT_CONFIRMATION: "SELECT * FROM vendor_products WHERE product_public_id = $1 AND owner_public_id = $2",
};

module.exports = { db_query };
