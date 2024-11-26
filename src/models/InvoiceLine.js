const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/db');
const Invoice = require('./Invoice');
const Product = require('./Product');
const ProductVariant = require('./ProductVariant');

const InvoiceLine = sequelize.define('InvoiceLine', {
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'product_id',
        },
        primaryKey: true,
    },
    invoice_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Invoice,
            key: 'invoice_id',
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
    invoice_line_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    invoice_line_price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
    },
});

// Define associations
InvoiceLine.belongsTo(Product, { foreignKey: 'product_id' });
InvoiceLine.belongsTo(ProductVariant, { foreignKey: 'product_variant_id' });
InvoiceLine.belongsTo(Invoice, { foreignKey: 'invoice_id' });

module.exports = InvoiceLine;