const { Client } = require('pg');
require('dotenv').config();  // Load environment variables

// PostgreSQL connection
const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

const connectDB = async () => {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database');
    } catch (err) {
        console.error('Database connection error', err);
        process.exit(1);
    }
};

module.exports = { connectDB, client };