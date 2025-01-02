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
        const { invoice_cus_total_amount, customer_id, invoice_lines } = req.body;

        const t = await sequelize.transaction();

        try {
            const newInvoice = await InvoiceCus.create(
                {
                    invoice_cus_total_amount,
                    customer_id,
                },
                { transaction: t }
            );

            const invoiceLinePromises = invoice_lines.map(async (line) => {
                let product;
                let productVariant;

                if (line.product_variant_id) {
                    productVariant = await ProductVariant.findOne({
                        where: { variant_id: line.product_variant_id },
                        attributes: ['variant_id', 'variant_stock_level', 'product_id', 'variant_quantity'],
                        transaction: t,
                    });

                    if (!productVariant) {
                        throw new Error(
                            `Product variant with ID ${line.product_variant_id} not found`
                        );
                    }

                    product = await Product.findOne({
                        where: { product_id: productVariant.product_id },
                        transaction: t,
                    });

                    if (!product) {
                        throw new Error(
                            `Product with ID ${productVariant.product_id} not found`
                        );
                    }

                    const variantQuantity = productVariant.variant_quantity;
                    const newProductStockLevel = product.product_stock_level -
                        (line.invoice_cus_line_quantity * variantQuantity);

                    if (newProductStockLevel < 0) {
                        throw new Error(
                            `Insufficient stock for product variant ${line.product_variant_id}`
                        );
                    }

                    await Product.update(
                        {
                            product_stock_level: newProductStockLevel,
                        },
                        {
                            where: { product_id: productVariant.product_id },
                            transaction: t,
                        }
                    );

                    // Update all variants of the product
                    const allProductVariants = await ProductVariant.findAll({
                        where: { product_id: productVariant.product_id },
                        transaction: t,
                    });

                    await Promise.all(allProductVariants.map(async (variant) => {
                        const variantQuantity = variant.variant_quantity;
                        const newVariantStockLevel = Math.floor(newProductStockLevel / variantQuantity);

                        await ProductVariant.update(
                            {
                                variant_stock_level: newVariantStockLevel,
                            },
                            {
                                where: { variant_id: variant.variant_id },
                                transaction: t,
                            }
                        );
                    }));

                    line.product_id = productVariant.product_id;
                } else {
                    product = await Product.findOne({
                        where: { product_id: line.product_id },
                        transaction: t,
                    });

                    if (!product) {
                        throw new Error(
                            `Product with ID ${line.product_id} not found`
                        );
                    }

                    const newProductStockLevel = product.product_stock_level -
                        line.invoice_cus_line_quantity;

                    if (newProductStockLevel < 0) {
                        throw new Error(
                            `Insufficient stock for product ${line.product_id}`
                        );
                    }

                    await Product.update(
                        {
                            product_stock_level: newProductStockLevel,
                        },
                        {
                            where: { product_id: line.product_id },
                            transaction: t,
                        }
                    );

                    // Update all variants of the product
                    const allProductVariants = await ProductVariant.findAll({
                        where: { product_id: line.product_id },
                        transaction: t,
                    });

                    await Promise.all(allProductVariants.map(async (variant) => {
                        const variantQuantity = variant.variant_quantity;
                        const newVariantStockLevel = Math.floor(newProductStockLevel / variantQuantity);

                        await ProductVariant.update(
                            {
                                variant_stock_level: newVariantStockLevel,
                            },
                            {
                                where: { variant_id: variant.variant_id },
                                transaction: t,
                            }
                        );
                    }));
                }

                return InvoiceLineCus.create(
                    {
                        invoice_cus_id: newInvoice.invoice_cus_id,
                        product_id: line.product_id,
                        product_variant_id: line.product_variant_id,
                        invoice_cus_line_quantity: line.invoice_cus_line_quantity,
                        invoice_cus_line_price: line.invoice_cus_line_price,
                    },
                    { transaction: t }
                );
            });

            await Promise.all(invoiceLinePromises);

            await t.commit();

            res.status(201).json(newInvoice);
        } catch (error) {
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
