const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

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
        defaultValue: Sequelize.NOW, 
    },

}, {
    tableName: 'DebtSup',
    timestamps: false,
});

invoiceSupp.belongsTo(Supplier, { foreignKey: 'supplier_id' });

module.exports = DebtSup;