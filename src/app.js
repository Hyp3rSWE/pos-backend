const express = require('express');
const cors = require('cors');
// const routes = require('./routes');
// const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
// app.use('/api', routes);

// Error Handling
// app.use(errorHandler);

module.exports = app;