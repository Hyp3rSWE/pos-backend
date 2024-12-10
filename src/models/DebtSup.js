const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const Supplier = require('./Supplier');

const DebtSup = sequelize.define('DebtSup', {

    supplier_id: {
        type: DataTypes.INTEGER,
    },
    dept_sup_amount: {
        type: DataTypes.DOUBLE,
    },
    dept_sup_timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW, 
    },

}, {
    tableName: 'DebtSup',
    timestamps: false,
});

DebtSup.belongsTo(Supplier, { foreignKey: 'supplier_id' });

module.exports = DebtSup;