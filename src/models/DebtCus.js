const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const Customer = require('./Customer');

const DebtCus = sequelize.define('debt_cus', {

    customer_id: {
        type: DataTypes.INTEGER,
        references : {
            model : Customer,key:'customer_id'
        },
        primaryKey : true 
    },
    debt_cus_amount: {
        type: DataTypes.DOUBLE,
    },
    debt_cus_timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,
        primaryKey : true 
    },

}, {
    tableName: 'debt_cus',
    timestamps: false,
});

DebtCus.belongsTo(Customer, { foreignKey: 'customer_id' });

module.exports = DebtCus;