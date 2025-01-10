console.log("app.js is here");
const express = require("express");
const session = require("express-session");

const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const userRoutes = require("./routes/UserRoutes");
const supplierRoutes = require("./routes/SupplierRoutes");
const customerRoutes = require("./routes/CustomerRoutes");
const productRoutes = require("./routes/ProductRoutes");
const productVariantRoutes = require("./routes/ProductVariantRoutes");
const invoiceRoutes = require("./routes/InvoiceRoutes");
const invoiceLineRoutes = require("./routes/InvoiceLineRoutes");

const debtCusRoutes = require("./routes/DebtCusRoute.js");
const debtSupRoutes = require("./routes/DebtSupRoute.js");

const invoiceSupRoutes = require("./routes/InvoiceRoutesSup.js");
const invoiceLineSupRoutes = require("./routes/InvoiceLineRoutesSup.js");

const Statistics = require('./routes/statistics.js');

const adjustmentRoutes = require('./routes/AdjustmentRoutes');

const { Adjustment, defineAssociations: defineAdjustmentAssociations } = require('./models/Adjustment');

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "POS API",
      version: "1.0.0",
      description: "API documentation for the POS system",
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
    components: {
      schemas: {
        Invoice: {
          type: "object",
          properties: {
            invoice_id: { type: "integer" },
            user_id: { type: "integer" },
            customer_id: { type: "integer" },
            invoice_timestamp: {
              type: "string",
              format: "date-time",
            },
            invoice_total_amount: {
              type: "number",
              format: "double",
            },
            invoice_paid_amount: {
              type: "number",
              format: "double",
            },
          },
        },
        InvoiceLine: {
          type: "object",
          properties: {
            product_id: { type: "integer" },
            invoice_id: { type: "integer" },
            product_variant_id: { type: "integer" },
            invoice_line_quantity: { type: "integer" },
            invoice_line_price: {
              type: "number",
              format: "double",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use("/users", userRoutes);

app.use("/products", productRoutes);
app.use("/product-variants", productVariantRoutes);

app.use("/customers", customerRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/invoice-lines", invoiceLineRoutes);
app.use("/debt-cus", debtCusRoutes);

app.use("/suppliers", supplierRoutes);
app.use("/invoices-sup", invoiceSupRoutes);
app.use("/invoice-sup-lines", invoiceLineSupRoutes);
app.use("/debt-sup", debtSupRoutes);

// Define Statistics
app.use("/statistics", Statistics)

app.use('/adjustments', adjustmentRoutes);

module.exports = app;
