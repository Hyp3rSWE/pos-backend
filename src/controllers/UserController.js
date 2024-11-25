const { sequelize } = require('../config/db');
const { QueryTypes } = require('sequelize');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await sequelize.query('SELECT * FROM "user"', { type: QueryTypes.SELECT });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: error.message });
    }
};