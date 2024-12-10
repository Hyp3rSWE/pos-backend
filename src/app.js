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

const invoiceSuppRoutes = require("./routes/invoiceSppRoute");
const debtsRoutes = require("./routes/DebtsRoute.js");
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
                url: "http://localhost:3000",
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
app.use("/suppliers", supplierRoutes);
app.use("/customers", customerRoutes);
app.use("/products", productRoutes);
app.use("/product-variants", productVariantRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/invoice-lines", invoiceLineRoutes);
app.use('/api/invoicesSupp', invoiceSuppRoutes);
app.use('/api/debts', debtsRoutes);

module.exports = app;
