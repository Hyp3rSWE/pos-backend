const InvoiceLineCus = require("../models/InvoiceLine");

class InvoiceLineController {
    // Get all invoice lines
    static async getAllInvoiceLines(req, res) {
        try {
            const invoiceLines = await InvoiceLineCus.findAll();
            res.status(200).json(invoiceLines);
        } catch (error) {
            console.error("Error fetching invoice lines:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get a single invoice line by composite key
    static async getInvoiceLineById(req, res) {
        try {
            const { invoice_id, product_id, product_variant_id } = req.params;
            const invoiceLine = await InvoiceLineCus.findOne({
                where: { invoice_id, product_id, product_variant_id },
            });
            if (!invoiceLine) {
                return res
                    .status(404)
                    .json({ message: "Invoice line not found" });
            }
            res.status(200).json(invoiceLine);
        } catch (error) {
            console.error("Error fetching invoice line:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Create a new invoice line
    static async createInvoiceLine(req, res) {
        try {
            const {
                invoice_id,
                product_id,
                product_variant_id,
                invoice_line_quantity,
                invoice_line_price,
            } = req.body;

            // Validate required fields
            if (
                !invoice_id ||
                !product_id ||
                !product_variant_id ||
                !invoice_line_quantity ||
                !invoice_line_price
            ) {
                return res
                    .status(400)
                    .json({ message: "Missing required fields" });
            }

            const newInvoiceLine = await InvoiceLineCus.create({
                invoice_id,
                product_id,
                product_variant_id,
                invoice_line_quantity,
                invoice_line_price,
            });
            res.status(201).json(newInvoiceLine);
        } catch (error) {
            console.error("Error creating invoice line:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Update an existing invoice line
    static async updateInvoiceLine(req, res) {
        try {
            const { invoice_id, product_id, product_variant_id } = req.params;
            const { invoice_line_quantity, invoice_line_price } = req.body;

            const invoiceLine = await InvoiceLine.findOne({
                where: { invoice_id, product_id, product_variant_id },
            });
            if (!invoiceLine) {
                return res
                    .status(404)
                    .json({ message: "Invoice line not found" });
            }

            if (invoice_line_quantity !== undefined)
                invoiceLine.invoice_line_quantity = invoice_line_quantity;
            if (invoice_line_price !== undefined)
                invoiceLine.invoice_line_price = invoice_line_price;

            await invoiceLine.save();
            res.status(200).json(invoiceLine);
        } catch (error) {
            console.error("Error updating invoice line:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Delete an invoice line
    static async deleteInvoiceLine(req, res) {
        try {
            const { invoice_id, product_id, product_variant_id } = req.params;

            const invoiceLine = await InvoiceLineCus.findOne({
                where: { invoice_id, product_id, product_variant_id },
            });
            if (!invoiceLine) {
                return res
                    .status(404)
                    .json({ message: "Invoice line not found" });
            }

            await invoiceLine.destroy();
            res.status(204).send(); // No content response
        } catch (error) {
            console.error("Error deleting invoice line:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = InvoiceLineController;
