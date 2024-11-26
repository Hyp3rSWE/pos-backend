const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

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
});

module.exports = Supplier;