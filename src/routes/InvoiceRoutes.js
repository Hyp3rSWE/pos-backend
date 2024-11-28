const express = require("express");
const router = express.Router();
const InvoiceController = require("../controllers/InvoiceController");

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Invoice endpoints
 */

/**
 * @swagger
 * paths:
 *   /invoices:
 *     post:
 *       summary: Create a new invoice along with invoice lines
 *       tags: [Invoices]
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                 customer_id:
 *                   type: integer
 *                 invoice_total_amount:
 *                   type: number
 *                   format: double
 *                 invoice_paid_amount:
 *                   type: number
 *                   format: double
 *                 invoice_lines:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product_id:
 *                         type: integer
 *                       product_variant_id:
 *                         type: integer
 *                       invoice_line_quantity:
 *                         type: integer
 *                       invoice_line_price:
 *                         type: number
 *                         format: double
 *       responses:
 *         201:
 *           description: The invoice has been created
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Invoice'
 *           example:
 *             invoice_id: 1
 *             user_id: 1
 *             customer_id: 1
 *             invoice_total_amount: 300.00
 *             invoice_paid_amount: 150.00
 *         500:
 *           description: Server error
 *     get:
 *       summary: Get all invoices
 *       tags: [Invoices]
 *       responses:
 *         200:
 *           description: A list of invoices
 *           content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Invoice'
 *           example:
 *             - invoice_id: 1
 *               user_id: 1
 *               customer_id: 1
 *               invoice_total_amount: 300.00
 *               invoice_paid_amount: 150.00
 *             - invoice_id: 2
 *               user_id: 2
 *               customer_id: 2
 *               invoice_total_amount: 500.00
 *               invoice_paid_amount: 200.00
 *         500:
 *           description: Server error
 *   /invoices/{invoice_id}:
 *     get:
 *       summary: Get an invoice by ID
 *       tags: [Invoices]
 *       parameters:
 *         - in: path
 *           name: invoice_id
 *           required: true
 *           description: The ID of the invoice
 *           schema:
 *             type: integer
 *       responses:
 *         200:
 *           description: The invoice details
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/Invoice'
 *           example:
 *             invoice_id: 1
 *             user_id: 1
 *             customer_id: 1
 *             invoice_total_amount: 300.00
 *             invoice_paid_amount: 150.00
 *         404:
 *           description: Invoice not found
 *         500:
 *           description: Server error
 *     put:
 *       summary: Update an existing invoice
 *       tags: [Invoices]
 *       parameters:
 *         - in: path
 *           name: invoice_id
 *           required: true
 *           description: The ID of the invoice to update
 *           schema:
 *             type: integer
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 invoice_total_amount:
 *                   type: number
 *                   format: double
 *                 invoice_paid_amount:
 *                   type: number
 *                   format: double
 *       responses:
 *         200:
 *           description: The updated invoice
 *         404:
 *           description: Invoice not found
 *         500:
 *           description: Server error
 *     delete:
 *       summary: Delete an invoice
 *       tags: [Invoices]
 *       parameters:
 *         - in: path
 *           name: invoice_id
 *           required: true
 *           description: The ID of the invoice to delete
 *           schema:
 *             type: integer
 *       responses:
 *         204:
 *           description: The invoice was deleted
 *         404:
 *           description: Invoice not found
 *         500:
 *           description: Server error
 */

router.get("/", InvoiceController.getAllInvoices);
router.get("/:invoice_id", InvoiceController.getInvoiceById);
router.post("/", InvoiceController.createInvoice);
router.put("/:invoice_id", InvoiceController.updateInvoice);
router.delete("/:invoice_id", InvoiceController.deleteInvoice);

module.exports = router;
