const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Define the model
const Adjustment = sequelize.define('Adjustment', {
    adjustment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_variant_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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

// Define associations after all models are defined
const defineAssociations = () => {
    const User = require('./User');
    const Product = require('./Product');
    const ProductVariant = require('./ProductVariant');

    Adjustment.belongsTo(User, { foreignKey: 'user_id' });
    Adjustment.belongsTo(Product, { foreignKey: 'product_id' });
    Adjustment.belongsTo(ProductVariant, { foreignKey: 'product_variant_id' });
};

// Call defineAssociations immediately
defineAssociations();

// Export only the model
module.exports = Adjustment;