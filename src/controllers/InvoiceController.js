const Invoice = require('../models/Invoice');
const InvoiceLine = require('../models/InvoiceLine');
const User = require('../models/User');
const Customer = require('../models/Customer');
const Product = require('../models/Product');
const ProductVariant = require('../models/ProductVariant');

class InvoiceController {
    static async getAllInvoices(req, res) {
        try {
            const invoices = await Invoice.findAll({
                include: [
                    { model: User, attributes: ['user_name', 'user_role'] },
                    { model: Customer, attributes: ['customer_name'] },
                    {
                        model: InvoiceLine,
                        include: [
                            { model: Product, attributes: ['product_name'] },
                            { model: ProductVariant, attributes: ['variant_name'] },
                        ],
                    },
                ],
            });
            res.status(200).json(invoices);
        } catch (error) {
            console.error('Error fetching invoices:', error);
            res.status(500).json({ error: 'Failed to fetch invoices' });
        }
    }

    static async getInvoiceById(req, res) {
        try {
            const { id } = req.params;
            const invoice = await Invoice.findByPk(id, {
                include: [
                    { model: User, attributes: ['user_name', 'user_role'] },
                    { model: Customer, attributes: ['customer_name'] },
                    {
                        model: InvoiceLine,
                        include: [
                            { model: Product, attributes: ['product_name'] },
                            { model: ProductVariant, attributes: ['variant_name'] },
                        ],
                    },
                ],
            });

            if (!invoice) {
                return res.status(404).json({ error: 'Invoice not found' });
            }

            res.status(200).json(invoice);
        } catch (error) {
            console.error('Error fetching invoice:', error);
            res.status(500).json({ error: 'Failed to fetch invoice' });
        }
    }

    static async createInvoice(req, res) {
        const { user_id, customer_id, invoice_total_amount, invoice_paid_amount, invoice_lines } = req.body;

        try {
            const invoice = await Invoice.create({
                user_id,
                customer_id,
                invoice_total_amount,
                invoice_paid_amount,
            });

            // Create associated invoice lines if provided
            if (Array.isArray(invoice_lines)) {
                for (const line of invoice_lines) {
                    await InvoiceLine.create({
                        invoice_id: invoice.invoice_id,
                        product_id: line.product_id,
                        product_variant_id: line.product_variant_id,
                        invoice_line_quantity: line.invoice_line_quantity,
                        invoice_line_price: line.invoice_line_price,
                    });
                }
            }

            res.status(201).json({ message: 'Invoice created successfully', invoice });
        } catch (error) {
            console.error('Error creating invoice:', error);
            res.status(500).json({ error: 'Failed to create invoice' });
        }
    }

    static async updateInvoice(req, res) {
        const { id } = req.params;
        const { invoice_total_amount, invoice_paid_amount } = req.body;

        try {
            const invoice = await Invoice.findByPk(id);

            if (!invoice) {
                return res.status(404).json({ error: 'Invoice not found' });
            }

            await invoice.update({ invoice_total_amount, invoice_paid_amount });

            res.status(200).json({ message: 'Invoice updated successfully', invoice });
        } catch (error) {
            console.error('Error updating invoice:', error);
            res.status(500).json({ error: 'Failed to update invoice' });
        }
    }

    static async deleteInvoice(req, res) {
        const { id } = req.params;

        try {
            const invoice = await Invoice.findByPk(id);

            if (!invoice) {
                return res.status(404).json({ error: 'Invoice not found' });
            }

            await invoice.destroy();
            res.status(200).json({ message: 'Invoice deleted successfully' });
        } catch (error) {
            console.error('Error deleting invoice:', error);
            res.status(500).json({ error: 'Failed to delete invoice' });
        }
    }
}

module.exports = InvoiceController;
