require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');
const { sendBroadcastMessage } = require('./utils/sender');
const { startListener } = require('./utils/listener');

const PORT = process.env.PORT || 3002;

const startBroadcastingUntilResponse = () => {
    console.log('Starting broadcasting...');

    sendBroadcastMessage((ipAddress, clearIntervalCallback) => {
        if (ipAddress) {
            console.log('Database Server IP:', ipAddress);

            // Update the DB_HOST with the received IP address
            process.env.DB_HOST = ipAddress;

            // Call connectDB with the updated DB_HOST (received IP address)
            connectDB()
                .then(() => {
                    console.log('Connected to the database using the new IP address.');
                    clearIntervalCallback(); // Clear the interval
                    process.exit(0); // Exit the process after successful connection
                })
                .catch((err) => {
                    console.error('Database connection failed with the new IP address:', err);
                    clearIntervalCallback(); // Clear the interval
                    process.exit(1); // Exit the process if connection fails
                });
        } else {
            console.log('No response yet. Retrying...');
        }
    });
};


const startServer = async () => {
    try {
        await connectDB(); 
        console.log('Database connection successful.');

        startListener();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        if (err.message === 'Database connection timed out') {
            console.error('Database connection timed out. Switching to broadcasting mode.');
            startBroadcastingUntilResponse();
            
        } else {
            console.error('Database connection failed. Exiting...');
            process.exit(1); 
        }
    }
};

startServer();
