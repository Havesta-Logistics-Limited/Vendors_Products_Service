
const calculateCommission =(originalPrice)=>{
 if(typeof originalPrice !== "number"){
    return console.log("Invalid price inputted")
 } 
  const commissionToBeRemoved = originalPrice * 0.10
  return commissionToBeRemoved
}


const calculateFinalPrice = (originalPrice, commission)=>{
    if(typeof originalPrice!== "number" || typeof commission!== "number"){
        return console.log("Invalid price or commission inputted")
    }
    const finalPrice = originalPrice - commission
    return parseFloat(finalPrice.toFixed(2))
}


module.exports = {calculateCommission, calculateFinalPrice}