const express = require("express");
const router = express.Router();
const InvoiceLineSupController = require("../controllers/InvoiceLineSupController");

/**
 * @swagger
 * tags:
 *   name: InvoiceLines
 *   description: Invoice lines endpoints
 */

/**
 * @swagger
 * paths:
 *   /invoice-lines:
 *     post:
 *       summary: Create a new invoice line
 *       tags: [InvoiceLines]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvoiceLine'
 *       responses:
 *         201:
 *           description: The invoice line was successfully created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/InvoiceLine'
 *           example:
 *             invoice_id: 1
 *             product_id: 101
 *             product_variant_id: 202
 *             invoice_line_quantity: 3
 *             invoice_line_price: 50.0
 *         500:
 *           description: Internal server error
 *     get:
 *       summary: Get all invoice lines
 *       tags: [InvoiceLines]
 *       responses:
 *         200:
 *           description: A list of invoice lines
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/InvoiceLine'
 *           example:
 *             - invoice_id: 1
 *               product_id: 101
 *               product_variant_id: 202
 *               invoice_line_quantity: 3
 *               invoice_line_price: 50.0
 *             - invoice_id: 2
 *               product_id: 102
 *               product_variant_id: 203
 *               invoice_line_quantity: 5
 *               invoice_line_price: 25.0
 *         500:
 *           description: Server error
 *   /invoice-lines/{invoice_id}/{product_id}/{product_variant_id}:
 *     get:
 *       summary: Retrieve a specific invoice line by its composite key
 *       description: Fetch a single invoice line based on its associated invoice, product, and product variant IDs
 *       tags: [InvoiceLines]
 *       parameters:
 *         - in: path
 *           name: invoice_id
 *           required: true
 *           description: The ID of the invoice
 *           schema:
 *             type: integer
 *         - in: path
 *           name: product_id
 *           required: true
 *           description: The ID of the product
 *           schema:
 *             type: integer
 *         - in: path
 *           name: product_variant_id
 *           required: true
 *           description: The ID of the product variant
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: The requested invoice line details
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/InvoiceLine'
 *           example:
 *             invoice_id: 1
 *             product_id: 101
 *             product_variant_id: 202
 *             invoice_line_quantity: 3
 *             invoice_line_price: 50.0
 *         404:
 *           description: Invoice line not found
 *         500:
 *           description: Internal server error
 *     delete:
 *       summary: Delete a specific invoice line
 *       description: Remove an invoice line based on its associated invoice, product, and product variant IDs
 *       tags: [InvoiceLines]
 *       parameters:
 *         - in: path
 *           name: invoice_id
 *           required: true
 *           description: The ID of the invoice
 *           schema:
 *             type: integer
 *         - in: path
 *           name: product_id
 *           required: true
 *           description: The ID of the product
 *           schema:
 *             type: integer
 *         - in: path
 *           name: product_variant_id
 *           required: true
 *           description: The ID of the product variant
 *           schema:
 *             type: integer
 *       responses:
 *         204:
 *           description: The invoice line was successfully deleted
 *         404:
 *           description: Invoice line not found
 *         500:
 *           description: Internal server error
 */

router.get("/",     InvoiceLineSupController.getAllInvoiceLines);
router.get(
    "/:invoice_sup_id/:product_id/:product_variant_id",
    InvoiceLineSupController.getInvoiceLineById
);
router.post("/",     InvoiceLineSupController.createInvoiceLine);
router.delete(
    "/:invoice_sup_id/:product_id/:product_variant_id",
    InvoiceLineSupController.deleteInvoiceLine
);

module.exports = router;
