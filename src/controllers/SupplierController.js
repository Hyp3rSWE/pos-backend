const { Supplier } = require('../models/Supplier');  // Ensure this is the correct import

// Create a new supplier
const createSupplier = async (req, res) => {
    try {
        const { supplier_name, supplier_phone } = req.body;

        // Validate the input
        if (!supplier_name || !supplier_phone) {
            return res.status(400).json({ message: 'Supplier name and phone are required' });
        }

        // Create the supplier record
        const newSupplier = await Supplier.create({
            supplier_name,
            supplier_phone,
        });

        // Respond with the created supplier
        return res.status(201).json(newSupplier);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get all suppliers
const getAllSuppliers = async (req, res) => {
    try {
        const suppliers = await Supplier.findAll();
        return res.status(200).json(suppliers);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a supplier by ID
const getSupplierById = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findByPk(id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        return res.status(200).json(supplier);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Update a supplier by ID
const updateSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const { supplier_name, supplier_phone } = req.body;

        const supplier = await Supplier.findByPk(id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        // Update supplier fields
        supplier.supplier_name = supplier_name || supplier.supplier_name;
        supplier.supplier_phone = supplier_phone || supplier.supplier_phone;

        // Save the updated supplier
        await supplier.save();

        return res.status(200).json(supplier);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a supplier by ID
const deleteSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const supplier = await Supplier.findByPk(id);

        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        await supplier.destroy();
        return res.status(200).json({ message: 'Supplier deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    createSupplier,
    getAllSuppliers,
    getSupplierById,
    updateSupplier,
    deleteSupplier,
};
