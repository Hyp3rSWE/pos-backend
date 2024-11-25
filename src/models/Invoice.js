const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Customer = require('./Customer');

const Invoice = sequelize.define('Invoice', {
    invoice_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'user_id',
        },
    },
    customer_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Customer,
            key: 'customer_id',
        },
    },
    invoice_timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    invoice_total_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
    invoice_paid_amount: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
});

// Define associations
Invoice.belongsTo(User, { foreignKey: 'user_id' });
Invoice.belongsTo(Customer, { foreignKey: 'customer_id' });

module.exports = Invoice;