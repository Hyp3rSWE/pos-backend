const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const userRoutes = require('./routes/UserRoutes');
const productRoutes = require('./routes/ProductRoutes');
const customerRoutes = require('./routes/CustomerRoutes');
const supplierRoutes = require('./routes/SupplierRoutes');


// const routes = require('./routes');
// const { errorHandler } = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'POS API',
      version: '1.0.0',
      description: 'API documentation for the POS system',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/customers', customerRoutes);
app.use('/suppliers', supplierRoutes);
// API Routes
// app.use('/api', routes);


// Error Handling
// app.use(errorHandler);

module.exports = app;