const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Supplier = sequelize.define('Supplier', {
    supplier_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    supplier_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    supplier_phone: {
        type: DataTypes.STRING(50),
    },
    supplier_debt :{
        type: DataTypes.DOUBLE,
    }
}, {
    tableName: 'supplier',
    timestamps: false
});

// Export the model first
module.exports = Supplier;

// Define associations after export
setTimeout(() => {
    const Product = require('./Product');
    Supplier.hasMany(Product, { foreignKey: 'supplier_id' });
}, 0);