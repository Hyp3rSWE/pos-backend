const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Customer = require("./Customer");
const Supplier = require("./Supplier");


const InvoiceSup = sequelize.define(
    "invoice_sup",
    {
        invoice_sup_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        supplier_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Customer,
                key: "customer_id",
            },
        },
        invoice_sup_timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        invoice_sup_total_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
       
    },
    {
        tableName: "invoice_sup",
        timestamps: false,
    }
);

// Define associations
InvoiceSup.belongsTo(Supplier, { foreignKey: "supplier_id" });

module.exports = InvoiceSup;
