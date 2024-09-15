const { pool } = require("../database/database.config.js");

const createOrder = async (orderDetails) => {
  const {
    orderId,
    customerId,
    vendorId,
    totalAmount,
    timePlaced,
    paymentMethod,
    shippingAddress,
    totalItem,
    productName,
    productImage,
    commissionDeducted,
    customerName,
  } = orderDetails;

  try {
  } catch (err) {}
}; /* SEND NOTIFICATION OR MAIL WHEN VENDOR GET'S A NEW ORDER */

const getAllOrders = async (req, res) => {
  const vendorId = "";
  if (!vendorId) {
    throw new Error("Invalid account please sign in again ");
  }

  let client;
  try {
  } catch (err) {
    await client.query("ROLLBACK");
    console.log(err.message)
  } finally {
    await client.release();
  }
};

const updateOrderStatus = async (req, res) => {};

const rejectOrder = () => {};

const contactCustomer = (req, res) => {};
