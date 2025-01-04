const express = require("express");
const router = express.Router();
const InvoiceSupController = require("../controllers/InvoiceSupController");

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Operations related to supplier invoices
 */

/**
 * @swagger
 * path:
 *  /invoices:
 *    get:
 *      summary: Get all supplier invoices
 *      tags: [Invoices]
 *      responses:
 *        200:
 *          description: List of all supplier invoices
 *        500:
 *          description: Internal server error
 */
router.get("/", InvoiceSupController.getAllInvoices);

/**
 * @swagger
 * path:
 *  /invoices/sup-{sup_id}:
 *    get:
 *      summary: Get invoice by supplier ID
 *      tags: [Invoices]
 *      parameters:
 *        - in: path
 *          name: sup_id
 *          required: true
 *          description: The supplier ID for which to fetch invoices
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Supplier invoice data
 *        404:
 *          description: Supplier not found
 *        500:
 *          description: Internal server error
 */
router.get("/sup-:sup_id", InvoiceSupController.getInvoiceBySupId);

/**
 * @swagger
 * path:
 *  /invoices/{invoice_sup_id}:
 *    get:
 *      summary: Get a supplier invoice by ID
 *      tags: [Invoices]
 *      parameters:
 *        - in: path
 *          name: invoice_sup_id
 *          required: true
 *          description: The invoice ID to fetch the supplier invoice
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Supplier invoice data
 *        404:
 *          description: Invoice not found
 *        500:
 *          description: Internal server error
 */
router.get("/:invoice_sup_id", InvoiceSupController.getInvoiceById);

/**
 * @swagger
 * path:
 *  /invoices:
 *    post:
 *      summary: Create a new supplier invoice
 *      tags: [Invoices]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                invoice_sup_total_amount:
 *                  type: number
 *                  description: The total amount for the invoice
 *                supplier_id:
 *                  type: string
 *                  description: The ID of the supplier
 *                invoice_lines:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      product_id:
 *                        type: string
 *                        description: The product ID
 *                      product_variant_id:
 *                        type: string
 *                        description: The product variant ID
 *                      invoice_sup_line_quantity:
 *                        type: integer
 *                        description: Quantity of the product in the invoice line
 *                      invoice_sup_line_price:
 *                        type: number
 *                        description: Price of the product in the invoice line
 *      responses:
 *        201:
 *          description: Invoice created successfully
 *        400:
 *          description: Missing or invalid input
 *        500:
 *          description: Internal server error
 */
router.post("/", InvoiceSupController.createInvoice);

/**
 * @swagger
 * path:
 *  /invoices/{invoice_sup_id}:
 *    put:
 *      summary: Update a supplier invoice
 *      tags: [Invoices]
 *      parameters:
 *        - in: path
 *          name: invoice_sup_id
 *          required: true
 *          description: The invoice ID to update
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                invoice_sup_total_amount:
 *                  type: number
 *                  description: The total amount for the updated invoice
 *                supplier_id:
 *                  type: string
 *                  description: The ID of the supplier
 *      responses:
 *        200:
 *          description: Invoice updated successfully
 *        400:
 *          description: Invalid input or missing fields
 *        404:
 *          description: Invoice not found
 *        500:
 *          description: Internal server error
 */
router.put("/:invoice_sup_id", InvoiceSupController.updateInvoice);

/**
 * @swagger
 * path:
 *  /invoices/{invoice_sup_id}:
 *    delete:
 *      summary: Delete a supplier invoice
 *      tags: [Invoices]
 *      parameters:
 *        - in: path
 *          name: invoice_sup_id
 *          required: true
 *          description: The invoice ID to delete
 *          schema:
 *            type: string
 *      responses:
 *        204:
 *          description: Invoice deleted successfully
 *        404:
 *          description: Invoice not found
 *        500:
 *          description: Internal server error
 */
router.delete("/:invoice_sup_id", InvoiceSupController.deleteInvoice);

module.exports = router;
