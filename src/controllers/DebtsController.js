const { Debts, Supplier } = require('../models'); 

// Get all debts with the supplier name
const getAllDebts = async (req, res) => {
    try {
        const debts = await Debts.findAll({
            include: [
                { model: Supplier, attributes: ['supplier_name'] }, 
            ],
        });
        res.status(200).json(debts);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving debts", error });
    }
};

// Get a specific debt by ID with the supplier name
const getDebtById = async (req, res) => {
    const { id } = req.params;
    try {
        const debt = await Debts.findByPk(id, {
            include: [
                { model: Supplier, attributes: ['supplier_name'] }, // Fetch supplier name
            ],
        });
        if (!debt) return res.status(404).json({ message: "Debt not found" });
        res.status(200).json(debt);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving debt", error });
    }
};

// Create a new debt
const createDebt = async (req, res) => {
    const { supplier_id, paidAmount, PaymentDate } = req.body;
    try {
        const newDebt = await Debts.create({
            supplier_id,
            paidAmount,
            PaymentDate,
        });
        res.status(201).json(newDebt);
    } catch (error) {
        res.status(500).json({ message: "Error creating debt", error });
    }
};

// Update an existing debt by ID
const updateDebt = async (req, res) => {
    const { id } = req.params;
    const { supplier_id, paidAmount, PaymentDate } = req.body;
    try {
        const debt = await Debts.findByPk(id);
        if (!debt) return res.status(404).json({ message: "Debt not found" });

        await debt.update({
            supplier_id,
            paidAmount,
            PaymentDate,
        });
        res.status(200).json(debt);
    } catch (error) {
        res.status(500).json({ message: "Error updating debt", error });
    }
};

// Delete a debt by ID
const deleteDebt = async (req, res) => {
    const { id } = req.params;
    try {
        const debt = await Debts.findByPk(id);
        if (!debt) return res.status(404).json({ message: "Debt not found" });

        await debt.destroy();
        res.status(200).json({ message: "Debt deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting debt", error });
    }
};

module.exports = {
    getAllDebts,
    getDebtById,
    createDebt,
    updateDebt,
    deleteDebt,
};
