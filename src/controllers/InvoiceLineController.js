const InvoiceLineCus = require("../models/InvoiceLine");
const { sequelize } = require("../config/db");
const Product = require("../models/Product");
const ProductVariant = require("../models/ProductVariant");

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
            const { invoice_cus_id, product_id, product_variant_id } =
                req.params;
            const invoiceLine = await InvoiceLineCus.findOne({
                where: {
                    invoice_cus_id: invoice_cus_id,
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
        const transaction = await sequelize.transaction(); // Start a transaction
        try {
            const {
                invoice_cus_id,
                product_id,
                product_variant_id,
                invoice_cus_line_quantity,
                invoice_cus_line_price,
            } = req.body;

            // Validate required fields
            if (
                !invoice_cus_id ||
                !product_id ||
                !invoice_cus_line_quantity ||
                !invoice_cus_line_price
            ) {
                return res
                    .status(400)
                    .json({ message: "Missing required fields" });
            }

            let stockItem;

            if (product_variant_id) {
                // Check stock in ProductVariant
                stockItem = await ProductVariant.findOne({
                    where: { variant_id: product_variant_id },
                });
            } else {
                // Check stock in Product
                stockItem = await Product.findOne({ where: { product_id } });
            }

            if (!stockItem) {
                return res
                    .status(404)
                    .json({ message: "Product or variant not found" });
            }

            // Check if stock is sufficient
            if (stockItem.variant_stock_level < invoice_cus_line_quantity) {
                return res
                    .status(400)
                    .json({ message: "Insufficient stock available" });
            }

            // Decrement stock
            stockItem.variant_stock_level -= invoice_cus_line_quantity;
            await stockItem.save({ transaction });

            // Create the invoice line
            const newInvoiceLine = await InvoiceLineCus.create(
                {
                    invoice_cus_id: invoice_cus_id,
                    product_id: product_id,
                    product_variant_id: product_variant_id || null, // Default to null if not provided
                    invoice_cus_line_quantity: invoice_cus_line_quantity,
                    invoice_cus_line_price: invoice_cus_line_price,
                },
                { transaction }
            );

            // Commit the transaction
            await transaction.commit();

            res.status(201).json(newInvoiceLine);
        } catch (error) {
            console.error("Error creating invoice line:", error);
            await transaction.rollback(); // Rollback the transaction in case of error
            res.status(500).json({ message: "Internal server error" });
        }
    }

    // Update an existing invoice line
    static async updateInvoiceLine(req, res) {
        try {
            const { invoice_cus_id, product_id, product_variant_id } =
                req.params;
            const { invoice_cus_line_quantity, invoice_cus_line_price } =
                req.body;

            const invoiceLine = await InvoiceLineCus.findOne({
                where: {
                    invoice_cus_id: invoice_cus_id,
                    product_id: product_id,
                    product_variant_id: product_variant_id,
                },
            });
            if (!invoiceLine) {
                return res
                    .status(404)
                    .json({ message: "Invoice line not found" });
            }

            if (invoice_cus_line_quantity !== undefined)
                invoiceLine.invoice_cus_line_quantity =
                    invoice_cus_line_quantity;
            if (invoice_cus_line_price !== undefined)
                invoiceLine.invoice_cus_line_price = invoice_cus_line_price;

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
            const { invoice_cus_id, product_id, product_variant_id } =
                req.params;

            const invoiceLine = await InvoiceLineCus.findOne({
                where: {
                    invoice_cus_id: invoice_cus_id,
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

    // Get all invoice lines by invoice_cus_id
    static async getAllInvoiceLinesByInvoiceID(req, res) {
        try {
            const { invoice_cus_id } = req.params;
            const invoiceLines = await InvoiceLineCus.findAll({
                where: {
                    invoice_cus_id: invoice_cus_id,
                },
            });
            res.status(200).json(invoiceLines);
        } catch (error) {
            console.error(
                "Error fetching invoice lines by invoice_cus_id:",
                error
            );
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

module.exports = InvoiceLineController;
