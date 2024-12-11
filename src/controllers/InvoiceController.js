const { sequelize } = require("../config/db");
const InvoiceCus = require("../models/Invoice");
const InvoiceLineCus = require("../models/InvoiceLine");
const ProductVariant = require("../models/ProductVariant");
const Product = require("../models/Product");

class InvoiceCusController {
    // Get all invoices
    static async getAllInvoices(req, res) {
        try {
            const invoices = await InvoiceCus.findAll();

            const invoicesWithLines = await Promise.all(
                invoices.map(async (invoice) => {
                    const invoiceLines = await InvoiceLineCus.findAll({
                        where: { invoice_cus_id: invoice.invoice_cus_id },
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
            const invoice = await InvoiceCus.findByPk(
                req.params.invoice_cus_id
            );

            if (!invoice) {
                return res.status(404).json({ message: "Invoice not found" });
            }

            // Fetch the invoice lines
            const invoiceLines = await InvoiceLineCus.findAll({
                where: { invoice_cus_id: invoice.invoice_cus_id },
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
        const { invoice_cus_total_amount, customer_id, invoice_lines } =
            req.body;

        // Start a transaction to ensure both operations (invoice and invoice lines) are handled together
        const t = await sequelize.transaction();

        try {
            // Step 1: Create the invoice
            const newInvoice = await InvoiceCus.create(
                {
                    invoice_cus_total_amount,
                    customer_id,
                },
                { transaction: t }
            );

            // Step 2: Create the associated invoice lines and decrement product stock
            const invoiceLinePromises = invoice_lines.map(async (line) => {
                let product;
                let productVariant;

                if (line.product_variant_id) {
                    // If product_variant_id is provided, decrement the stock for the product variant
                    productVariant = await ProductVariant.findOne({
                        where: { variant_id: line.product_variant_id },
                        transaction: t, // Ensure this is in the same transaction
                    });

                    if (!productVariant) {
                        throw new Error(
                            `Product variant with ID ${line.product_variant_id} not found`
                        );
                    }

                    // Check if the product variant has enough stock
                    if (
                        productVariant.variant_stock_level <
                        line.invoice_cus_line_quantity
                    ) {
                        throw new Error(
                            `Insufficient stock for product variant ${line.product_variant_id}`
                        );
                    }

                    // Update the product variant stock level (decrementing)
                    await ProductVariant.update(
                        {
                            variant_stock_level:
                                productVariant.variant_stock_level -
                                line.invoice_cus_line_quantity,
                        },
                        {
                            where: { variant_id: line.product_variant_id },
                            transaction: t, // Ensure this is in the same transaction
                        }
                    );
                } else {
                    // If no product_variant_id, decrement the stock for the product
                    product = await Product.findOne({
                        where: { product_id: line.product_id },
                        transaction: t, // Ensure this is in the same transaction
                    });

                    if (!product) {
                        throw new Error(
                            `Product with ID ${line.product_id} not found`
                        );
                    }

                    // Check if the product has enough stock
                    if (
                        product.product_stock_level <
                        line.invoice_cus_line_quantity
                    ) {
                        throw new Error(
                            `Insufficient stock for product ${line.product_id}`
                        );
                    }

                    // Update the product stock level (decrementing)
                    await Product.update(
                        {
                            product_stock_level:
                                product.product_stock_level -
                                line.invoice_cus_line_quantity,
                        },
                        {
                            where: { product_id: line.product_id },
                            transaction: t, // Ensure this is in the same transaction
                        }
                    );
                }

                // Create the invoice line
                return InvoiceLineCus.create(
                    {
                        invoice_cus_id: newInvoice.invoice_cus_id, // Use the generated invoice_id
                        product_id: line.product_id,
                        product_variant_id: line.product_variant_id,
                        invoice_cus_line_quantity:
                            line.invoice_cus_line_quantity,
                        invoice_cus_line_price: line.invoice_cus_line_price,
                    },
                    { transaction: t }
                );
            });

            // Wait for all invoice lines to be created and stock updated
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
                error: error.message,
            });
        }
    }
    // Update an existing invoice
    static async updateInvoice(req, res) {
        try {
            const invoice = await InvoiceCus.findByPk(
                req.params.invoice_cus_id
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
            const invoice = await InvoiceCus.findByPk(
                req.params.invoice_cus_id
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

module.exports = InvoiceCusController;
