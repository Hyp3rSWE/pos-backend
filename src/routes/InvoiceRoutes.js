const express = require("express");
const router = express.Router();
const InvoiceCusController = require("../controllers/InvoiceController");

/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: Get all invoices with their lines
 *     description: Fetches all invoices along with their corresponding invoice lines.
 *     responses:
 *       200:
 *         description: A list of all invoices with lines.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 *       500:
 *         description: Internal server error
 */
router.get("/", InvoiceCusController.getAllInvoices);

/**
 * @swagger
 * /invoices/{invoice_cus_id}:
 *   get:
 *     summary: Get a single invoice by ID
 *     description: Fetches a specific invoice along with its lines using the invoice ID.
 *     parameters:
 *       - in: path
 *         name: invoice_cus_id
 *         required: true
 *         description: The ID of the invoice to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The invoice with its lines.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Internal server error
 */
router.get("/:invoice_cus_id", InvoiceCusController.getInvoiceById);

/**
 * @swagger
 * /invoices:
 *   post:
 *     summary: Create a new invoice
 *     description: Creates a new invoice with lines.
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvoiceCreate'
 *     responses:
 *       201:
 *         description: Invoice created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Internal server error
 */
router.post("/", InvoiceCusController.createInvoice);

/**
 * @swagger
 * /invoices/{invoice_cus_id}:
 *   put:
 *     summary: Update an existing invoice
 *     description: Updates the details of a specific invoice.
 *     parameters:
 *       - in: path
 *         name: invoice_cus_id
 *         required: true
 *         description: The ID of the invoice to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvoiceUpdate'
 *     responses:
 *       200:
 *         description: The updated invoice.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Internal server error
 */
router.put("/:invoice_cus_id", InvoiceCusController.updateInvoice);

/**
 * @swagger
 * /invoices/{invoice_cus_id}:
 *   delete:
 *     summary: Delete an invoice
 *     description: Deletes a specific invoice by its ID.
 *     parameters:
 *       - in: path
 *         name: invoice_cus_id
 *         required: true
 *         description: The ID of the invoice to delete.
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Invoice deleted successfully.
 *       404:
 *         description: Invoice not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:invoice_cus_id", InvoiceCusController.deleteInvoice);

module.exports = router;
