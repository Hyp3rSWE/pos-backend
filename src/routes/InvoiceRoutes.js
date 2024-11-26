const express = require('express');
const InvoiceController = require('../controllers/InvoiceController');
const { isAdminAuthenticated, isCashierAuthenticated } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Invoice:
 *       type: object
 *       required:
 *         - user_id
 *         - customer_id
 *         - invoice_total_amount
 *         - invoice_paid_amount
 *       properties:
 *         invoice_id:
 *           type: integer
 *           description: Auto-generated ID for the invoice
 *         user_id:
 *           type: integer
 *           description: ID of the user associated with the invoice
 *         customer_id:
 *           type: integer
 *           description: ID of the customer associated with the invoice
 *         invoice_total_amount:
 *           type: number
 *           description: Total amount of the invoice
 *         invoice_paid_amount:
 *           type: number
 *           description: Amount paid for the invoice
 *         invoice_lines:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/InvoiceLine'
 */

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: API for managing invoices
 */

/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: Retrieve all invoices
 *     tags: [Invoices]
 *     responses:
 *       200:
 *         description: List of invoices
 */
router.get('/invoices', isCashierAuthenticated,InvoiceController.getAllInvoices);

/**
 * @swagger
 * /invoices/{id}:
 *   get:
 *     summary: Retrieve a specific invoice by ID
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the invoice to retrieve
 *     responses:
 *       200:
 *         description: Invoice details
 *       404:
 *         description: Invoice not found
 */
router.get('/invoices/:id', isCashierAuthenticated,InvoiceController.getInvoiceById);

/**
 * @swagger
 * /invoices:
 *   post:
 *     summary: Create a new invoice
 *     tags: [Invoices]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       201:
 *         description: Invoice created successfully
 */
router.post('/invoices', isCashierAuthenticated,InvoiceController.createInvoice);

/**
 * @swagger
 * /invoices/{id}:
 *   put:
 *     summary: Update an existing invoice
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the invoice to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Invoice'
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *       404:
 *         description: Invoice not found
 */
router.put('/invoices/:id',isCashierAuthenticated, InvoiceController.updateInvoice);

/**
 * @swagger
 * /invoices/{id}:
 *   delete:
 *     summary: Delete an invoice
 *     tags: [Invoices]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the invoice to delete
 *     responses:
 *       200:
 *         description: Invoice deleted successfully
 *       404:
 *         description: Invoice not found
 */
router.delete('/invoices/:id',isCashierAuthenticated, InvoiceController.deleteInvoice);

module.exports = router;
