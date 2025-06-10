const { VendorDatabase } = require("../database/VendorDbController");
const axios = require("axios");

const vendorDB = new VendorDatabase();

const getVendors = async (req, res) => {
  console.log("fegrbhwgefwed");
  let vendorProfile;
  let vendorData = [];
  try {
    const { data } = await axios.get(
      "https://all-user-auth-service.onrender.com/marketplace_service/api/vendors/get_all_vendors"
    );
    // console.log(data, "vendderfeweavwcd");

    vendorProfile = data.data;

    if (data) {
      const publicId = data.data.filter((item) => item.public_unique_Id);
      const vendorProduct = await vendorDB.getAllVendorsProduct();
      console.log(vendorProduct, "prod")

      vendorProfile.forEach((vendor) => {
        const existingVendor = vendorData.find(v => v.vendorProfile.public_unique_Id === vendor.public_unique_Id);

          if (!existingVendor) {
    // Add vendor with empty product list
    vendorData.push({
      vendorProfile: vendor,
      products: []
    });
  }
            
        vendorProduct.products.forEach((prod) => {
          if (vendor.public_unique_Id === prod.owner_public_id) {
         const targetVendor = vendorData.find(v => v.vendorProfile.public_unique_Id === vendor.public_unique_Id);
      targetVendor.products.push(prod);
          }
        });
      });
      return res.status(200).json({ success: true, message:"vendor data gotten successfully",data: vendorData });

    }
    
  } catch (e) {
    return res.status(400).json({ success: false, message:"could not get vendors" });
  }
};

module.exports = { getVendors };
