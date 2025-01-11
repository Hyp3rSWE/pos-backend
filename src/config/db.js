console.log("db.js is here");
const { Sequelize } = require('sequelize');
require('dotenv').config();  

let sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'src/config/database.sqlite', // Path to your SQLite file
    logging: false,
});


const connectDB = async () => {
    try {
        console.log('Attempting to connect to the SQLite database...');
        await sequelize.authenticate(); // Authenticate using Sequelize
        console.log('Connected to SQLite database.');
    } catch (err) {
        console.error('Database connection error:', err.message);
        throw err; // Rethrow any errors
    }
};


module.exports = { connectDB, sequelize };
