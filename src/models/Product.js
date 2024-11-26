const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const Supplier = require('./Supplier');

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    supplier_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Supplier,
            key: 'supplier_id',
        },
    },
    product_barcode: {
        type: DataTypes.STRING(50),
    },
    product_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    product_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    product_stock_level: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
});

// Define associations
Product.belongsTo(Supplier, { foreignKey: 'supplier_id' });

module.exports = Product;