const { Sequelize } = require('sequelize');
require('dotenv').config();  // Load environment variables

// PostgreSQL connection with Sequelize
const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: true, 
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();  // Test connection
        console.log('Connected to PostgreSQL database');
    } catch (err) {
        console.error('Database connection error', err);
        process.exit(1);
    }
};

module.exports = { connectDB, sequelize };
