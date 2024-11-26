const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');

const Customer = sequelize.define('Customer', {
    customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    customer_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    customer_phone: {
        type: DataTypes.STRING(50),
    },
    customer_debt: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
    },
}, {
    tableName: 'customer',
    timestamps: false,
});

module.exports = Customer;