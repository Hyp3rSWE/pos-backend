console.log("server.js is here");
const { connectDB } = require('./config/db');
require('dotenv').config();
const app = require('./app');
const { sendBroadcastMessage } = require('./utils/sender');
const { startListener } = require('./utils/listener');
const fs = require('fs');
const path = require('path');


const PORT = process.env.PORT || 3001;

const updateEnvFile = (newHost) => {
    const envPath = path.resolve(__dirname, '../.env');
    const envFile = fs.readFileSync(envPath, 'utf-8');

    const newEnvFile = envFile.replace(/DB_HOST=[^\r\n]*/, `DB_HOST=${newHost}`);
    
    // Write the updated content back to .env file
    fs.writeFileSync(envPath, newEnvFile, 'utf-8');

    // Reload the environment variables to reflect the new value
    require('dotenv').config();
};

const startBroadcastingUntilResponse = () => {
    console.log('Starting broadcasting...');

    sendBroadcastMessage((ipAddress, clearIntervalCallback) => {
        if (ipAddress) {
            console.log('Database Server IP:', ipAddress);

            // Update DB_HOST in .env and reload environment variables
            updateEnvFile(ipAddress);

            process.exit();
        } else {
            console.log('No response yet. Retrying...');
        }
    });
};


const startServer = async () => {
    try {
        // Removed the timeout logic from connectDB
        await connectDB(); 
        console.log('Database connection successful.');

        startListener();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        if (err.message === 'Database connection timed out') {
            // This block is not needed anymore
            console.error('Database connection timed out. Switching to broadcasting mode.');
            startBroadcastingUntilResponse();
        } else {
            console.error('Database connection failed. Exiting...');
            process.exit(1); 
        }
    }
};

startServer();
