const InvoiceLine = require('../models/InvoiceLine');
const Product = require('../models/Product');
const ProductVariant = require('../models/ProductVariant');
const Invoice = require('../models/Invoice');


class InvoiceLineController {
    static async getAllInvoiceLines(req, res) {
        try {
            const invoiceLines = await InvoiceLine.findAll({
                include: [
                    { model: Product, attributes: ['product_name'] },
                    { model: ProductVariant, attributes: ['variant_name'] },
                    { model: Invoice, attributes: ['invoice_id'] },
                ],
            });
            res.status(200).json(invoiceLines);
        } catch (error) {
            console.error('Error fetching invoice lines:', error);
            res.status(500).json({ error: 'Failed to fetch invoice lines' });
        }
    }

    static async getInvoiceLine(req, res) {
        try {
            const { invoice_id, product_id, product_variant_id } = req.params;
            const invoiceLine = await InvoiceLine.findOne({
                where: { invoice_id, product_id, product_variant_id },
                include: [
                    { model: Product, attributes: ['product_name'] },
                    { model: ProductVariant, attributes: ['variant_name'] },
                    { model: Invoice, attributes: ['invoice_id'] },
                ],
            });

            if (!invoiceLine) {
                return res.status(404).json({ error: 'Invoice line not found' });
            }

            res.status(200).json(invoiceLine);
        } catch (error) {
            console.error('Error fetching invoice line:', error);
            res.status(500).json({ error: 'Failed to fetch invoice line' });
        }
    }

    static async createInvoiceLine(req, res) {
        try {
            const { product_id, invoice_id, product_variant_id, invoice_line_quantity, invoice_line_price } = req.body;

            if (!product_id || !invoice_id || !product_variant_id || !invoice_line_quantity || !invoice_line_price) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            const invoiceLine = await InvoiceLine.create({
                product_id,
                invoice_id,
                product_variant_id,
                invoice_line_quantity,
                invoice_line_price,
            });

            res.status(201).json({ message: 'Invoice line created successfully', invoiceLine });
        } catch (error) {
            console.error('Error creating invoice line:', error);
            res.status(500).json({ error: 'Failed to create invoice line' });
        }
    }

    static async updateInvoiceLine(req, res) {
        try {
            const { invoice_id, product_id, product_variant_id } = req.params;
            const { invoice_line_quantity, invoice_line_price } = req.body;

            const invoiceLine = await InvoiceLine.findOne({ where: { invoice_id, product_id, product_variant_id } });

            if (!invoiceLine) {
                return res.status(404).json({ error: 'Invoice line not found' });
            }

            await invoiceLine.update({ invoice_line_quantity, invoice_line_price });

            res.status(200).json({ message: 'Invoice line updated successfully', invoiceLine });
        } catch (error) {
            console.error('Error updating invoice line:', error);
            res.status(500).json({ error: 'Failed to update invoice line' });
        }
    }

    static async deleteInvoiceLine(req, res) {
        try {
            const { invoice_id, product_id, product_variant_id } = req.params;

            const invoiceLine = await InvoiceLine.findOne({ where: { invoice_id, product_id, product_variant_id } });

            if (!invoiceLine) {
                return res.status(404).json({ error: 'Invoice line not found' });
            }

            await invoiceLine.destroy();
            res.status(200).json({ message: 'Invoice line deleted successfully' });
        } catch (error) {
            console.error('Error deleting invoice line:', error);
            res.status(500).json({ error: 'Failed to delete invoice line' });
        }
    }
}

module.exports = InvoiceLineController;
