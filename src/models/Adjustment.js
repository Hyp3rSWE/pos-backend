const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./User');
const Product = require('./Product');
const ProductVariant = require('./ProductVariant');

const Adjustment = sequelize.define('Adjustment', {
    adjustment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Product,
            key: 'product_id'
        }
    },
    product_variant_id: {
        type: DataTypes.INTEGER,
        references: {
            model: ProductVariant,
            key: 'variant_id'
        }
    },
    previous_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    new_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    adjustment_reason: {
        type: DataTypes.STRING(255)
    },
    adjustment_timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'adjustment',
    timestamps: false
});

// Define associations
Adjustment.belongsTo(User, { foreignKey: 'user_id' });
Adjustment.belongsTo(Product, { foreignKey: 'product_id' });
Adjustment.belongsTo(ProductVariant, { foreignKey: 'product_variant_id' });

module.exports = Adjustment;