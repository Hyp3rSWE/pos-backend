const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const Customer = require('./Customer');

const DebtCus = sequelize.define('DebtCus', {

    customer_id: {
        type: DataTypes.INTEGER,
    },
    dept_cus_amount: {
        type: DataTypes.DOUBLE,
    },
    dept_cus_timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW, 
    },

}, {
    tableName: 'DebtCus',
    timestamps: false,
});

DebtCus.belongsTo(Customer, { foreignKey: 'customer_id' });

module.exports = DebtCus;