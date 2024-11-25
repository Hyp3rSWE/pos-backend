const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Product = require('./Product');

const ProductVariant = sequelize.define('ProductVariant', {
    variant_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'product_id',
        },
    },
    variant_barcode: {
        type: DataTypes.STRING(50),
    },
    variant_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    variant_quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    variant_stock_level: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

// Define associations
ProductVariant.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = ProductVariant;