const InvoiceLineSup = require("../models/InvoiceLineSup");

class InvoiceLineSupController {
    // Get all invoice lines
    static async getAllInvoiceLines(req, res) {
        try {
            const invoiceLines = await InvoiceLineSup.findAll();
            res.status(200).json(invoiceLines);
        } catch (error) {
            console.error("Error fetching invoice lines:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Get a single invoice line by composite key
    static async getInvoiceLineById(req, res) {
        try {
            const { invoice_sup_id, product_id, product_variant_id } =
                req.params;
            const invoiceLine = await InvoiceLineSup.findOne({
                where: {
                    invoice_sup_id: invoice_sup_id,
                    product_id: product_id,
                    product_variant_id: product_variant_id,
                },
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
                invoice_sup_id,
                product_id,
                product_variant_id,
                invoice_sup_line_quantity,
                invoice_sup_line_price,
            } = req.body;

            // Validate required fields
            if (
                !invoice_sup_id ||
                !product_id ||
                !invoice_sup_line_quantity ||
                !invoice_sup_line_price
            ) {
                return res
                    .status(400)
                    .json({ message: "Missing required fields" });
            }

            const newInvoiceLine = await InvoiceLineSup.create({
                invoice_sup_id: invoice_sup_id,
                product_id: product_id,
                product_variant_id: product_variant_id || null,
                invoice_sup_line_quantity: invoice_sup_line_quantity,
                invoice_sup_line_price: invoice_sup_line_price,
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
            const { invoice_sup_id, product_id, product_variant_id } =
                req.params;
            const { invoice_sup_line_quantity, invoice_sup_line_price } =
                req.body;

            const invoiceLine = await InvoiceLineSup.findOne({
                where: {
                    invoice_sup_id: invoice_sup_id,
                    product_id: product_id,
                    product_variant_id: product_variant_id,
                },
            });
            if (!invoiceLine) {
                return res
                    .status(404)
                    .json({ message: "Invoice line not found" });
            }

            if (invoice_sup_line_quantity !== undefined)
                invoiceLine.invoice_sup_line_quantity =
                    invoice_sup_line_quantity;
            if (invoice_sup_line_price !== undefined)
                invoiceLine.invoice_sup_line_price = invoice_sup_line_price;

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
            const { invoice_sup_id, product_id, product_variant_id } =
                req.params;

            const invoiceLine = await InvoiceLineSup.findOne({
                where: {
                    invoice_sup_id: invoice_sup_id,
                    product_id: product_id,
                    product_variant_id: product_variant_id,
                },
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

    // Get all invoice lines by invoice_sup_id
    static async getAllInvoiceLinesByInvoiceID(req, res) {
        try {
            const { invoice_sup_id } = req.params;
            const invoiceLines = await InvoiceLineSup.findAll({
                where: {
                    invoice_sup_id: invoice_sup_id,
                },
            });
            res.status(200).json(invoiceLines);
        } catch (error) {
            console.error(
                "Error fetching invoice lines by invoice_sup_id:",
                error
            );
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = InvoiceLineSupController;
