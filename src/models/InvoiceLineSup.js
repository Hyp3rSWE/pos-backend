const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const InvoiceSup = require('./Invoice');
const Product = require('./Product');
const ProductVariant = require('./ProductVariant');

const InvoiceLineSup = sequelize.define('invoice-line_sup', {
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'product_id',
        },
        primaryKey: true,
    },
    invoice_sup_id: {
        type: DataTypes.INTEGER,
        references: {
            model: InvoiceSup,
            key: 'invoice_sup_id',
        },
        primaryKey: true,
    },
    product_variant_id: {
        type: DataTypes.INTEGER,
        references: {
            model: ProductVariant,
            key: 'variant_id',
        },
        primaryKey: true,
    },
    invoice_sup_line_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    invoice_sup_line_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
},
    {
        tableName: 'invoice_line_sup',
        timestamps: false,
    }
);

// Define associations
InvoiceLineSup.belongsTo(Product, { foreignKey: 'product_id' });
InvoiceLineSup.belongsTo(ProductVariant, { foreignKey: 'product_variant_id' });
InvoiceLineSup.belongsTo(InvoiceSup, { foreignKey: 'invoice_sup_id' });

module.exports = InvoiceLineSup;