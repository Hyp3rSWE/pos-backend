/**
 * @swagger
 * tags:
 *   name: InvoiceLines
 *   description: API for managing invoice lines
 */

const express = require("express");
const router = express.Router();
const InvoiceLineController = require("../controllers/InvoiceLineController");

/**
 * @swagger
 * /invoice-lines:
 *   get:
 *     summary: Get all invoice lines
 *     tags: [InvoiceLines]
 *     responses:
 *       200:
 *         description: A list of all invoice lines.
 *       500:
 *         description: Internal server error.
 */
router.get("/", InvoiceLineController.getAllInvoiceLines);

/**
 * @swagger
 * /invoice-lines/{invoice_cus_id}/{product_id}/{product_variant_id}:
 *   get:
 *     summary: Get an invoice line by its composite key
 *     tags: [InvoiceLines]
 *     parameters:
 *       - in: path
 *         name: invoice_cus_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer invoice ID
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *       - in: path
 *         name: product_variant_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product variant ID
 *     responses:
 *       200:
 *         description: The requested invoice line.
 *       404:
 *         description: Invoice line not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
    "/:invoice_cus_id/:product_id/:product_variant_id",
    InvoiceLineController.getInvoiceLineById
);

/**
 * @swagger
 * /invoice-lines/{invoice_cus_id}:
 *   get:
 *     summary: Get all invoice lines by customer invoice ID
 *     tags: [InvoiceLines]
 *     parameters:
 *       - in: path
 *         name: invoice_cus_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer invoice ID
 *     responses:
 *       200:
 *         description: A list of all invoice lines for the specified invoice.
 *       500:
 *         description: Internal server error.
 */
router.get(
    "/:invoice_cus_id",
    InvoiceLineController.getAllInvoiceLinesByInvoiceID
);

/**
 * @swagger
 * /invoice-lines:
 *   post:
 *     summary: Create a new invoice line
 *     tags: [InvoiceLines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - invoice_cus_id
 *               - product_id
 *               - invoice_cus_line_quantity
 *               - invoice_cus_line_price
 *             properties:
 *               invoice_cus_id:
 *                 type: string
 *               product_id:
 *                 type: string
 *               product_variant_id:
 *                 type: string
 *               invoice_cus_line_quantity:
 *                 type: number
 *               invoice_cus_line_price:
 *                 type: number
 *     responses:
 *       201:
 *         description: The created invoice line.
 *       400:
 *         description: Missing required fields or invalid input.
 *       500:
 *         description: Internal server error.
 */
router.post("/", InvoiceLineController.createInvoiceLine);

/**
 * @swagger
 * /invoice-lines/{invoice_cus_id}/{product_id}/{product_variant_id}:
 *   put:
 *     summary: Update an existing invoice line
 *     tags: [InvoiceLines]
 *     parameters:
 *       - in: path
 *         name: invoice_cus_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer invoice ID
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *       - in: path
 *         name: product_variant_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product variant ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoice_cus_line_quantity:
 *                 type: number
 *               invoice_cus_line_price:
 *                 type: number
 *     responses:
 *       200:
 *         description: The updated invoice line.
 *       404:
 *         description: Invoice line not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
    "/:invoice_cus_id/:product_id/:product_variant_id",
    InvoiceLineController.updateInvoiceLine
);

/**
 * @swagger
 * /invoice-lines/{invoice_cus_id}/{product_id}/{product_variant_id}:
 *   delete:
 *     summary: Delete an invoice line
 *     tags: [InvoiceLines]
 *     parameters:
 *       - in: path
 *         name: invoice_cus_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Customer invoice ID
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product ID
 *       - in: path
 *         name: product_variant_id
 *         required: true
 *         schema:
 *           type: string
 *         description: Product variant ID
 *     responses:
 *       204:
 *         description: No content.
 *       404:
 *         description: Invoice line not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
    "/:invoice_cus_id/:product_id/:product_variant_id",
    InvoiceLineController.deleteInvoiceLine
);

module.exports = router;
