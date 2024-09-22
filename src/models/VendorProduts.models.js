 const {DataTypes} = require("sequelize");

 const sequelize = require("../database/sequelize")


 const VendorProduct = sequelize.define("vendor_product", {
    id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },

    owner_public_id: {
        type: DataTypes.UUID,
        allowNull: false
    },

    product_public_id: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true
    },

    product_name: {
        type: DataTypes.STRING(255),
        allowNull:false,
    },

    in_stock: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      quantity_available: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      commission_rate: {
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0.10
      },
      category: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      measurement: {
        type: DataTypes.STRING(150),
        allowNull: false
      },
      product_image: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      original_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      commission: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      final_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      product_description: {
        type: DataTypes.STRING(150),
        allowNull: true
      }
 }, {
    tableName: "vendor_products",
    timestamps: false,
    hooks: {
        beforeSave: (products)=>{
            products.commission = products.original_price * products.commission_rate;
            products.final_price = products.original_price - products.commission;
        }
    }
 })

 module.exports = {VendorProduct}