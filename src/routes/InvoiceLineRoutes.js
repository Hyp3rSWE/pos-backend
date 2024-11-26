const express = require('express');
const InvoiceLineController = require('../controllers/InvoiceLineController');
const { isAdminAuthenticated, isCashierAuthenticated } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     InvoiceLine:
 *       type: object
 *       required:
 *         - product_id
 *         - invoice_id
 *         - product_variant_id
 *         - invoice_line_quantity
 *         - invoice_line_price
 *       properties:
 *         product_id:
 *           type: integer
 *         invoice_id:
 *           type: integer
 *         product_variant_id:
 *           type: integer
 *         invoice_line_quantity:
 *           type: integer
 *         invoice_line_price:
 *           type: number
 */

/**
 * @swagger
 * /invoice-lines:
 *   get:
 *     summary: Retrieve all invoice lines
 *     tags: [InvoiceLine]
 *     responses:
 *       200:
 *         description: List of invoice lines
 */
router.get('/invoice-lines',isCashierAuthenticated, InvoiceLineController.getAllInvoiceLines);

/**
 * @swagger
 * /invoice-lines/{invoice_id}/{product_id}/{product_variant_id}:
 *   get:
 *     summary: Retrieve an invoice line by its composite keys
 *     tags: [InvoiceLine]
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: path
 *         name: product_variant_id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Invoice line details
 */
router.get('/invoice-lines/:invoice_id/:product_id/:product_variant_id', isCashierAuthenticated,InvoiceLineController.getInvoiceLine);

/**
 * @swagger
 * /invoice-lines:
 *   post:
 *     summary: Create a new invoice line
 *     tags: [InvoiceLine]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvoiceLine'
 *     responses:
 *       201:
 *         description: Invoice line created successfully
 */
router.post('/invoice-lines', isCashierAuthenticated,InvoiceLineController.createInvoiceLine);

/**
 * @swagger
 * /invoice-lines/{invoice_id}/{product_id}/{product_variant_id}:
 *   put:
 *     summary: Update an invoice line
 *     tags: [InvoiceLine]
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: path
 *         name: product_variant_id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvoiceLine'
 *     responses:
 *       200:
 *         description: Invoice line updated successfully
 */
router.put('/invoice-lines/:invoice_id/:product_id/:product_variant_id', isCashierAuthenticated,InvoiceLineController.updateInvoiceLine);

/**
 * @swagger
 * /invoice-lines/{invoice_id}/{product_id}/{product_variant_id}:
 *   delete:
 *     summary: Delete an invoice line
 *     tags: [InvoiceLine]
 *     parameters:
 *       - in: path
 *         name: invoice_id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: integer
 *         required: true
 *       - in: path
 *         name: product_variant_id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: Invoice line deleted successfully
 */
router.delete('/invoice-lines/:invoice_id/:product_id/:product_variant_id', isCashierAuthenticated,InvoiceLineController.deleteInvoiceLine);

module.exports = router;
