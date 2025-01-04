const express = require("express");
const router = express.Router();
const InvoiceLineSupController = require("../controllers/InvoiceLineSupController");

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all invoice lines
 *     description: Retrieve a list of all supplier invoice lines.
 *     responses:
 *       200:
 *         description: A list of invoice lines.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error.
 */
router.get("/", InvoiceLineSupController.getAllInvoiceLines);

/**
 * @swagger
 * /{invoice_sup_id}/{product_id}/{product_variant_id}:
 *   get:
 *     summary: Get a specific invoice line
 *     description: Retrieve a specific supplier invoice line by its composite key.
 *     parameters:
 *       - in: path
 *         name: invoice_sup_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The supplier invoice ID.
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID.
 *       - in: path
 *         name: product_variant_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product variant ID.
 *     responses:
 *       200:
 *         description: The requested invoice line.
 *       404:
 *         description: Invoice line not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
    "/:invoice_sup_id/:product_id/:product_variant_id",
    InvoiceLineSupController.getInvoiceLineById
);

/**
 * @swagger
 * /{invoice_sup_id}:
 *   get:
 *     summary: Get all invoice lines by invoice ID
 *     description: Retrieve all supplier invoice lines for a specific invoice ID.
 *     parameters:
 *       - in: path
 *         name: invoice_sup_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The supplier invoice ID.
 *     responses:
 *       200:
 *         description: A list of invoice lines.
 *       500:
 *         description: Internal server error.
 */
router.get(
    "/:invoice_sup_id",
    InvoiceLineSupController.getAllInvoiceLinesByInvoiceID
);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new invoice line
 *     description: Create a new supplier invoice line with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoice_sup_id:
 *                 type: integer
 *               product_id:
 *                 type: integer
 *               product_variant_id:
 *                 type: integer
 *               invoice_sup_line_quantity:
 *                 type: number
 *               invoice_sup_line_price:
 *                 type: number
 *             required:
 *               - invoice_sup_id
 *               - product_id
 *               - invoice_sup_line_quantity
 *               - invoice_sup_line_price
 *     responses:
 *       201:
 *         description: Invoice line created successfully.
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Internal server error.
 */
router.post("/", InvoiceLineSupController.createInvoiceLine);

/**
 * @swagger
 * /{invoice_sup_id}/{product_id}/{product_variant_id}:
 *   put:
 *     summary: Update an invoice line
 *     description: Update the details of a supplier invoice line by its composite key.
 *     parameters:
 *       - in: path
 *         name: invoice_sup_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The supplier invoice ID.
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID.
 *       - in: path
 *         name: product_variant_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product variant ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               invoice_sup_line_quantity:
 *                 type: number
 *               invoice_sup_line_price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Invoice line updated successfully.
 *       404:
 *         description: Invoice line not found.
 *       500:
 *         description: Internal server error.
 */
router.put(
    "/:invoice_sup_id/:product_id/:product_variant_id",
    InvoiceLineSupController.updateInvoiceLine
);

/**
 * @swagger
 * /{invoice_sup_id}/{product_id}/{product_variant_id}:
 *   delete:
 *     summary: Delete an invoice line
 *     description: Delete a supplier invoice line by its composite key.
 *     parameters:
 *       - in: path
 *         name: invoice_sup_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The supplier invoice ID.
 *       - in: path
 *         name: product_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product ID.
 *       - in: path
 *         name: product_variant_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The product variant ID.
 *     responses:
 *       204:
 *         description: Invoice line deleted successfully.
 *       404:
 *         description: Invoice line not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
    "/:invoice_sup_id/:product_id/:product_variant_id",
    InvoiceLineSupController.deleteInvoiceLine
);

module.exports = router;
