const {pool} = require("../database/database.config.js")

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
    customerName
  } = orderDetails;

  try{

  }catch(err){

  }
}; /* SEND NOTIFICATION OR MAIL WHEN VENDOR GET'S A NEW ORDER */




const getOrders = async(req, res)=>{

}


const updateOrderStatus = async (req, res)=>{

}


const rejectOrder = ()=>{

}


const contactCustomer = (req, res)=>{

}



