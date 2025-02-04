const { DataTypes } = require("sequelize");
const sequelize = require("../database/sequelize");
const moment = require("moment");

const VendorPromotion = sequelize.define(
  "vendor_promotion",
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    owner_public_id: {
      type: DataTypes.UUID,
      allowNull: false,
    //   unique: true
    },
    product_public_id: {
      type: DataTypes.UUID,
      allowNull: true,
      unique: true,
    },
    promotion_public_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
      },
    product_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    in_stock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    quantity_available: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commission_rate: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.1,
    },
    category: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    measurement: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    product_image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    original_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    promo_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    commission: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    final_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    product_description: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull:false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull:false
    }
  
  },
  {
    tableName: "vendor_promotions",
    timestamps: true,
    hooks: {
      beforeSave: (product) => {
        if (product.promo_price != null) {
          product.createdAt = moment().format("YYYY-MM-DD HH:mm:ss"); // example format
          product.updatedAt = moment().format("YYYY-MM-DD HH:mm:ss");
          product.commission = product.promo_price * product.commission_rate;
          product.final_price = product.promo_price - product.commission;
        }
      },
      beforeUpdate: (product) => {
          product.commission = product.promo_price * product.commission_rate;
          product.final_price = product.promo_price - product.commission;
      },

    },
  }
);


module.exports = { VendorPromotion };
