
require('dotenv').config();
const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB()
    .then(() => {
        
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => {
        
        console.error('Database connection failed:', err);
    });