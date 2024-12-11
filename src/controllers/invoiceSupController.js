const { sequelize } = require("../config/db");
const InvoiceSup = require("../models/InvoiceSup");
const InvoiceLineSup = require("../models/InvoiceLineSup");

class InvoiceSupController {
    // Get all invoices
    static async getAllInvoices(req, res) {
        try {
            const invoices = await InvoiceSup.findAll();

            const invoicesWithLines = await Promise.all(
                invoices.map(async (invoice) => {
                    const invoiceLines = await InvoiceLineSup.findAll({
                        where: { invoice_sup_id: invoice.invoice_sup_id },
                    });
                    return {
                        ...invoice.get(),
                        invoiceLines,
                    };
                })
            );

            res.json(invoicesWithLines);
        } catch (error) {
            res.status(500).json({ message: "Error fetching invoices", error });
        }
    }

    // Get a single invoice by ID
    // Get a single invoice by ID without using `include` for lines
    static async getInvoiceById(req, res) {
        try {
            const invoice = await InvoiceSup.findByPk(
                req.params.invoice_sup_id
            );

            if (!invoice) {
                return res.status(404).json({ message: "Invoice not found" });
            }

            // Fetch the invoice lines
            const invoiceLines = await InvoiceLineSup.findAll({
                where: { invoice_sup_id: invoice.invoice_sup_id },
            });

            // Return the invoice with its lines
            res.json({
                ...invoice.get(),
                invoiceLines,
            });
        } catch (error) {
            res.status(500).json({
                message: "Error fetching invoice and its lines",
                error: error.message,
            });
        }
    }

    // Create a new invoice
    static async createInvoice(req, res) {
        const { invoice_sup_total_amount, supplier_id, invoice_lines } =
            req.body;

        // Start a transaction to ensure both operations (invoice and invoice lines) are handled together
        const t = await sequelize.transaction();

        try {
            // Step 1: Create the invoice
            const newInvoice = await InvoiceSup.create(
                {
                    invoice_sup_total_amount,
                    supplier_id,
                },
                { transaction: t }
            );

            // Step 2: Create the associated invoice lines
            const invoiceLinePromises = invoice_lines.map((line) => {
                return InvoiceLineSup.create(
                    {
                        invoice_sup_id: newInvoice.invoice_sup_id, // Use the generated invoice_id
                        product_id: line.product_id,
                        product_variant_id: line.product_variant_id,
                        invoice_sup_line_quantity:
                            line.invoice_sup_line_quantity,
                        invoice_sup_line_price: line.invoice_sup_line_price,
                    },
                    { transaction: t }
                );
            });

            // Wait for all invoice lines to be created
            await Promise.all(invoiceLinePromises);

            // Commit the transaction
            await t.commit();

            // Respond with the created invoice
            res.status(201).json(newInvoice);
        } catch (error) {
            // Rollback the transaction in case of an error
            await t.rollback();
            res.status(500).json({
                message: "Error creating invoice and invoice lines",
                error,
            });
        }
    }
    // Update an existing invoice
    static async updateInvoice(req, res) {
        try {
            const invoice = await InvoiceSup.findByPk(
                req.params.invoice_sup_id
            );
            if (!invoice) {
                return res.status(404).json({ message: "Invoice not found" });
            }
            await invoice.update(req.body);
            res.json(invoice);
        } catch (error) {
            res.status(500).json({ message: "Error updating invoice", error });
        }
    }

    // Delete an invoice
    static async deleteInvoice(req, res) {
        try {
            const invoice = await InvoiceSup.findByPk(
                req.params.invoice_sup_id
            );
            if (!invoice) {
                return res.status(404).json({ message: "Invoice not found" });
            }
            await invoice.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: "Error deleting invoice", error });
        }
    }
}

module.exports = InvoiceSupController;
