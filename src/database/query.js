const db_query = {
    GET_ALL_PRODUCTS: "SELECT * FROM vendor_products WHERE owner_public_id=$1 LIMIT $2 OFFSET $3",
    GET_TOTAL_PAGES: "SELECT COUNT(*) FROM vendor_products",
    GET_INDIVIDUAL_PRODUCT_DETAILS: "SELECT * FROM vendor_products WHERE product_public_id= $1 AND owner_public_id=$2",
    TOGGLE_PRODUCT_STATUS: "UPDATE vendor_products SET in_stock= $1 WHERE owner_public_id = $2 AND product_public_id=$3",
    ADD_PRODUCTS: "INSERT INTO products (name, price, description, owner_id, status) VALUES ($1, $2, $3, $4, $5)",
    EDIT_PRODUCT: "UPDATE products SET name = $1, price = $"
}



module.exports = {db_query}