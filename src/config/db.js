const { Sequelize } = require('sequelize');
require('dotenv').config();  

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    logging: false,
   
});

const connectDB = async (timeouti = false) => {
    
    console.log('from the host : ');
    console.log(process.env.DB_HOST);
    // Timeout logic to fail after 5 seconds if the DB is unreachable
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timed out')), 5000)); 
    
    try {
        await Promise.race([sequelize.authenticate(), timeout]); // Race between authenticate and timeout
        console.log('Connected to PostgreSQL database');
    } catch (err) {
        if (err.message === 'Connection timed out') {
            throw new Error('Database connection timed out');
        } else {
            console.error('Database connection error:', err.message);
            throw err; // Rethrow other errors
        }
    }
};

module.exports = { connectDB, sequelize };
