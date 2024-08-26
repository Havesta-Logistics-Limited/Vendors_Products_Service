const db_query = {
    GET_ALL_PRODUCTS: "SELECT * FROM products WHERE owner_id = $1",
    GET_INDIVIDUAL_PRODUCT_DETAILS: "SELECT * FROM products WHERE product_public_id = $1 AND owner_id=$2",
    TOGGLE_PRODUCT_STATUS: "UPDATE products SET status = NOT status WHERE id = $1",
    ADD_PRODUCTS: "INSERT INTO products (name, price, description, owner_id, status) VALUES ($1, $2, $3, $4, $5)",
    EDIT_PRODUCT: "UPDATE products SET name = $1, price = $"
}



module.exports = {db_query}