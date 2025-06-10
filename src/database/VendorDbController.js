const { VendorProduct } = require("../models/VendorProduts.models");
const { VendorPromotion } = require("../models/VendorPromotion.models");

const sequelize = require("../database/sequelize");

class VendorDatabase {
  async getAllProducts(vendorId, limit, offset, page) {
    try {
      const products = await VendorProduct.findAndCountAll({
        where: { owner_public_id: vendorId },
        order: [["id", "DESC"]],
      });

      return { success: true, products: products.rows, total: products.count };
    } catch (e) {
      return { success: false, message: "Server could not fetch products" };
    }
  }

  async deleteProduct(vendorId, productId) {
    const t = await sequelize.transaction();
    try {
      const productExists = await VendorProduct.findOne({
        where: {
          owner_public_id: vendorId,
          product_public_id: productId,
        },

        transaction: t,
      });

      if (!productExists) {
        await t.rollback();
        return { success: false, message: "Product not found" };
      }

      const deletedItem = await VendorProduct.destroy({
        where: {
          owner_public_id: vendorId,
          product_public_id: productId,
        },
        transaction: t,
      });

      console.log(deletedItem);
      if (deletedItem > 0) {
        await t.commit();
        return { success: true, message: "Product deleted successfully" };
      } else {
        return { success: false, message: "Failed to delete product" };
      }
    } catch (e) {
      await t.rollback();
      return { success: false, message: e.message };
    }
  }

  async getIndividualProduct(vendorId, productId) {
    try {
      const products = await VendorProduct.findOne({
        where: { owner_public_id: vendorId, product_public_id: productId },
      });

      if (!products) {
        return { success: false, message: "Product details not found" };
      }

      return { success: true, product: products };
    } catch (e) {
      return { success: false, message: "Server could not fetch products" };
    }
  }

  async addProduct(productData) {
    const transaction = await sequelize.transaction();
    try {
      const newProduct = await VendorProduct.create(productData, {
        transaction,
      });
      await transaction.commit();
      return {
        success: true,
        message: "Product added successfully",
        product: newProduct,
      };
    } catch (e) {
      console.log(e.message);
      await transaction.rollback();
    }
  }

  async editProduct(vendorId, productId, productData) {
    const transaction = await sequelize.transaction();

    try {
      const productExists = await VendorProduct.findOne({
        where: {
          owner_public_id: vendorId,
          product_public_id: productId,
        },
        transaction,
      });

      if (!productExists) {
        throw new Error("Product not found");
      }

      productExists.set(productData);
      await productExists.save({ transaction });

      await transaction.commit();
      return {
        success: true,
        message: "Product updated successfully",
        product: productExists,
      };
    } catch (e) {
      await transaction.rollback();
      return { success: false, message: e.message };
    }
  }

  //PROMOTION
  async addPromotion(productData) {
    const transaction = await sequelize.transaction();
    try {
      const newProduct = await VendorPromotion.create(productData, {
        transaction,
      });
      await transaction.commit();

      return {
        success: true,
        message: "Promotion added successfully",
        product: newProduct,
      };
    } catch (e) {
      console.log(e.message);
      await transaction.rollback();
    }
  }

  async addNewPromotion(productData) {
    const transaction = await sequelize.transaction();
    try {
      const newProduct = await VendorPromotion.create(productData, {
        transaction,
      });
      await transaction.commit();

      return {
        success: true,
        message: "Promotion added successfully",
        product: newProduct,
      };
    } catch (e) {
      console.log(e.message);
      await transaction.rollback();
    }
  }

  async getAllPromotion(vendorId, limit, offset, page) {
    try {
      const promotion = await VendorPromotion.findAndCountAll({
        where: { owner_public_id: vendorId },
        order: [["id", "DESC"]],
      });
      console.log(promotion.rows, "getting promotons");

      return {
        success: true,
        promotion: promotion.rows,
        total: promotion.count,
      };
    } catch (e) {
      return { success: false, message: "Server could not fetch products" };
    }
  }

  async editPromotion(vendorId, productId, promotionData) {
    const transaction = await sequelize.transaction();

    try {
      const productExists = await VendorProduct.findOne({
        where: {
          owner_public_id: vendorId,
          product_public_id: productId,
        },
        transaction,
      });

      if (!productExists) {
        throw new Error("Product not found");
      }

      productExists.set(promotionData);
      await productExists.save({ transaction });

      await transaction.commit();
      return {
        success: true,
        message: "Product updated successfully",
        product: productExists,
      };
    } catch (e) {
      await transaction.rollback();
      return { success: false, message: e.message };
    }
  }

 async getAllVendorsProduct() {


    try {
      // publicId.forEach(async (vendor) => {
        const vendorExists = await VendorProduct.findAll({
        });
          
      // });
      // return vendors;
// console.log(vendors, "Vendi")
        const data = vendorExists.map((vendor) => vendor.dataValues);
// console.log(data, "data from all prod")
            return {
        products: data,
      };
    } catch (e) {
      return { success: false, message: e.message };
    }
  }
}

module.exports = { VendorDatabase };
