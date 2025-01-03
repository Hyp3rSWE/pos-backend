const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    supplier_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    product_barcode: {
        type: DataTypes.STRING(50),
        unique: true
    },
    product_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    product_cost: {
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
},
    {
        tableName: 'product',
        timestamps: false,
    }
);

// Export the model first
module.exports = Product;

// Define associations after export
setTimeout(() => {
    const Supplier = require('./Supplier');
    Product.belongsTo(Supplier, { foreignKey: 'supplier_id' });
}, 0);
