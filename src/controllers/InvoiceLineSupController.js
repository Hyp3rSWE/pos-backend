const InvoiceLineSup = require("../models/InvoiceLineSup");

class InvoiceLineSupController {
    // Get all invoice lines
    static async getAllInvoiceLines(req, res) {
        try {
            const invoiceLines = await InvoiceLineSup.findAll();
            res.json(invoiceLines);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching invoice lines",
                error,
            });
        }
    }

    // Get a single invoice line by composite key
    static async getInvoiceLineById(req, res) {
        try {
            const { invoice_sup_id, product_id, product_variant_id } = req.params;
            const invoiceLine = await InvoiceLineSup.findOne({
                where: {
                    invoice_sup_id,
                    product_id,
                    product_variant_id,
                },
            });
            if (!invoiceLine) {
                return res
                    .status(404)
                    .json({ message: "Invoice line not found" });
            }
            res.json(invoiceLine);
        } catch (error) {
            res.status(500).json({
                message: "Error fetching invoice line",
                error,
            });
        }
    }

    // Create a new invoice line
    static async createInvoiceLine(req, res) {
        try {
            const newInvoiceLine = await InvoiceLineSup.create(req.body);
            res.status(201).json(newInvoiceLine);
        } catch (error) {
            res.status(500).json({
                message: "Error creating invoice line",
                error,
            });
        }
    }

    // Update an existing invoice line
    static async updateInvoiceLine(req, res) {
        try {
            const { invoice_sup_id, product_id, product_variant_id } = req.params;
            const invoiceLine = await InvoiceLine.findOne({
                where: {
                    invoice_sup_id,
                    product_id,
                    product_variant_id,
                },
            });
            if (!invoiceLine) {
                return res
                    .status(404)
                    .json({ message: "Invoice line not found" });
            }
            await invoiceLine.update(req.body);
            res.json(invoiceLine);
        } catch (error) {
            res.status(500).json({
                message: "Error updating invoice line",
                error,
            });
        }
    }

    // Delete an invoice line
    static async deleteInvoiceLine(req, res) {
        try {
            const { invoice_sup_id, product_id, product_variant_id } = req.params;
            const invoiceLine = await InvoiceLineSup.findOne({
                where: {
                    invoice_sup_id,
                    product_id,
                    product_variant_id,
                },
            });
            if (!invoiceLine) {
                return res
                    .status(404)
                    .json({ message: "Invoice line not found" });
            }
            await invoiceLine.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({
                message: "Error deleting invoice line",
                error,
            });
        }
    }
}

module.exports = InvoiceLineSupController;
