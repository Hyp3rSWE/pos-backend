const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const InvoiceCus = require("./Invoice");
const Product = require("./Product");
const ProductVariant = require("./ProductVariant");

const InvoiceLineCus = sequelize.define(
    "invoice_line_cus",
    {
        product_id: {
            type: DataTypes.INTEGER,
            references: {
                model: Product,
                key: "product_id",
            },
            primaryKey: true,
        },
        invoice_cus_id: {
            type: DataTypes.INTEGER,
            references: {
                model: InvoiceCus,
                key: "invoice_cus_id",
            },
            primaryKey: true,
        },
        product_variant_id: {
            type: DataTypes.INTEGER,
            references: {
                model: ProductVariant,
                key: "variant_id",
            },
            allowNull: true,
        },
        invoice_cus_line_quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        invoice_cus_line_price: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
    },
    {
        tableName: "invoice_line_cus",
        timestamps: false,
    }
);

// Define associations
InvoiceLineCus.belongsTo(Product, { foreignKey: "product_id" });
InvoiceLineCus.belongsTo(ProductVariant, { foreignKey: "product_variant_id" });
InvoiceLineCus.belongsTo(InvoiceCus, {
    as: "invoice_line_cus",
    foreignKey: "invoice_cus_id",
});

module.exports = InvoiceLineCus;
