const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const User = sequelize.define(
    'user', 
    {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_role: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        user_name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        user_pass: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: 'user', 
        timestamps: false, 
    }
);

module.exports = User;
