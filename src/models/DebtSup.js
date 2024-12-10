const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');
const Supplier = require('./Supplier');

const DebtSup = sequelize.define('debt_sup', {

    supplier_id: {
        type: DataTypes.INTEGER,
        references : {
            model : Supplier,key:'supplier_id'
        },
        primaryKey : true 
    },
    debt_sup_amount: {
        type: DataTypes.DOUBLE,
    },
    debt_sup_timestamp: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.NOW,
        primaryKey : true 
    },

}, {
    tableName: 'debt_sup',
    timestamps: false,
});

DebtSup.belongsTo(Supplier, { foreignKey: 'supplier_id' });

module.exports = DebtSup;