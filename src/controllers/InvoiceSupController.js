const { sequelize } = require("../config/db");
const InvoiceSup = require("../models/InvoiceSup");
const InvoiceLineSup = require("../models/InvoiceLineSup");
const Product = require("../models/Product");
const ProductVariant = require("../models/ProductVariant");

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

    static async getInvoiceBySupId(req, res) {
        try {
            const { sup_id } = req.params;

            // Fetch invoices for the given supplier
            const invoices = await InvoiceSup.findAll({
                where: { supplier_id: sup_id },
            });

            if (!invoices || invoices.length === 0) {
                return res.status(404).json({ message: "No invoices found for the supplier." });
            }

            // Add invoice line and product details for each invoice
            const invoicesWithDetails = await Promise.all(
                invoices.map(async (invoice) => {
                    const invoiceLines = await InvoiceLineSup.findAll({
                        where: { invoice_sup_id: invoice.invoice_sup_id },
                        include: [
                            {
                                model: Product,
                                attributes: ['product_name', 'product_barcode', 'product_cost', 'product_price'],
                            },
                        ],
                    });

                    const detailedLines = invoiceLines.map((line) => {
                        const product = line.Product;
                        return {
                            ...line.get(),
                            product_name: product?.product_name,
                            product_barcode: product?.product_barcode,
                            product_cost: product?.product_cost,
                            product_price: product?.product_price,
                        };
                    });

                    return {
                        ...invoice.get(),
                        date: invoice.createdAt,
                        invoiceLines: detailedLines,
                    };
                })
            );

            return res.json(invoicesWithDetails);
        } catch (error) {
            console.error("Error fetching invoices:", error);
            return res.status(500).json({ message: "Internal server error.", error });
        }
    }


    // Create a new invoice
    static async createInvoice(req, res) {
        const { invoice_sup_total_amount, supplier_id, invoice_lines } =
            req.body;

        const t = await sequelize.transaction();

        try {
            const newInvoice = await InvoiceSup.create(
                {
                    invoice_sup_total_amount,
                    supplier_id,
                },
                { transaction: t }
            );

            const invoiceLinePromises = invoice_lines.map(async (line) => {
                let product;
                let productVariants;

                if (line.product_variant_id) {
                    // Fetch the product variant and product
                    const productVariant = await ProductVariant.findOne({
                        where: { variant_id: line.product_variant_id },
                        attributes: ['variant_id', 'variant_quantity', 'product_id'],
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

                    // Update stock level for all variants of the product
                    productVariants = await ProductVariant.findAll({
                        where: { product_id: productVariant.product_id },
                        transaction: t,
                    });

                    const newProductStockLevel = product.product_stock_level +
                        (line.invoice_sup_line_quantity * productVariant.variant_quantity);

                    await Product.update(
                        {
                            product_stock_level: newProductStockLevel,
                        },
                        {
                            where: { product_id: productVariant.product_id },
                            transaction: t,
                        }
                    );

                    await Promise.all(productVariants.map(async (variant) => {
                        const newVariantStockLevel = Math.floor(newProductStockLevel / variant.variant_quantity);
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

                    // Use the product_id from the productVariant
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

                    await Product.update(
                        {
                            product_stock_level:
                                product.product_stock_level +
                                line.invoice_sup_line_quantity,
                        },
                        {
                            where: { product_id: line.product_id },
                            transaction: t,
                        }
                    );

                    // Find the product variant associated with the product
                    productVariants = await ProductVariant.findAll({
                        where: { product_id: line.product_id },
                        transaction: t,
                    });

                    if (productVariants && productVariants.length > 0) {
                        const newProductStockLevel = product.product_stock_level +
                            line.invoice_sup_line_quantity;

                        await Promise.all(productVariants.map(async (variant) => {
                            const newVariantStockLevel = Math.floor(newProductStockLevel / variant.variant_quantity);
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
                }

                return InvoiceLineSup.create(
                    {
                        invoice_sup_id: newInvoice.invoice_sup_id,
                        product_id: line.product_id,
                        product_variant_id: line.product_variant_id,
                        invoice_sup_line_quantity:
                            line.invoice_sup_line_quantity,
                        invoice_sup_line_price: line.invoice_sup_line_price,
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
