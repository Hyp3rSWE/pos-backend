const {invoiceSupp, Product, Supplier } = require('../models'); 

// Get all invoiceSupp entries with product and supplier names
const getAllInvoices = async (req, res) => {
    try {
        const invoices = await invoiceSupp.findAll({
            include: [
                { model: Product, attributes: ['product_name'] }, 
                { model: Supplier, attributes: ['supplier_name'] }, 
            ],
        });
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving invoices", error });
    }
};

// Get a single invoiceSupp entry by ID with product and supplier names
const getInvoiceById = async (req, res) => {
    const { id } = req.params;
    try {
        const invoice = await invoiceSupp.findByPk(id, {
            include: [
                { model: Product, attributes: ['product_name'] }, 
                { model: Supplier, attributes: ['supplier_name'] }, 
            ],
        });
        if (!invoice) return res.status(404).json({ message: "Invoice not found" });
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving invoice", error });
    }
};

// Create a new invoiceSupp entry
const createInvoice = async (req, res) => {
    const { supplier_id, product_id, quantity, unitPrice } = req.body;
    try {
        const newInvoice = await invoiceSupp.create({
            supplier_id,
            product_id,
            quantity,
            unitPrice,
        });
        res.status(201).json(newInvoice);
    } catch (error) {
        res.status(500).json({ message: "Error creating invoice", error });
    }
};


// Update an existing invoiceSupp entry
const updateInvoice = async (req, res) => {
    const { id } = req.params;
    const { supplier_id, product_id, quantity, unitPrice } = req.body;
    try {
        const invoice = await invoiceSupp.findByPk(id);
        if (!invoice) return res.status(404).json({ message: "Invoice not found" });

        await invoice.update({
            supplier_id,
            product_id,
            quantity,
            unitPrice,
        });
        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: "Error updating invoice", error });
    }
};

// Delete an invoiceSupp entry
const deleteInvoice = async (req, res) => {
    const { id } = req.params;
    try {
        const invoice = await invoiceSupp.findByPk(id);
        if (!invoice) return res.status(404).json({ message: "Invoice not found" });

        await invoice.destroy();
        res.status(200).json({ message: "Invoice deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting invoice", error });
    }
};

module.exports = {
    getAllInvoices,
    getInvoiceById,
    createInvoice,
    updateInvoice,
    deleteInvoice,
};
