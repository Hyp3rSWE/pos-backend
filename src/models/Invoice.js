const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./User");
const Customer = require("./Customer");

const InvoiceCus = sequelize.define(
    "Invoice_cus",
    {
        invoice_cus_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        customer_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Customer,
                key: "customer_id",
            },
        },
        invoice_cus_timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        invoice_cus_total_amount: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
       
    },
    {
        tableName: "invoice_cus",
        timestamps: false,
    }
);

// Define associations

InvoiceCus.belongsTo(Customer, { foreignKey: "customer_id" });

module.exports = InvoiceCus;
