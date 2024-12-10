const DebtSup = require('../models/DebtSup');
const Supplier = require('../models/Supplier');

// CREATE a new debt record
const createDebt = async (req, res) => {
    try {
        const { supplier_id, debt_sup_amount } = req.body;
        
        if (!supplier_id || !debt_sup_amount) {
            return res.status(400).json({ message: 'Supplier ID and debt amount are required.' });
        }

        const newDebt = await DebtSup.create({
            supplier_id,
            debt_sup_amount,
        });

        res.status(201).json(newDebt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// READ all debt records
const getAllDebts = async (req, res) => {
    try {
        const debts = await DebtSup.findAll({
            include: [
                {
                    model: Supplier,
                    as: 'Supplier', 
                },
            ],
        });

        res.status(200).json(debts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// READ a single debt record by ID
const getDebtBySup = async (req, res) => {
    try {
        const { id } = req.params;

        const debt = await DebtSup.findByPk(id, {
            include: [
                {
                    model: Supplier,
                    as: 'Supplier',
                },
            ],
        });

        if (!debt) {
            return res.status(404).json({ message: 'Debt record not found.' });
        }

        res.status(200).json(debt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE a debt record
const updateDebt = async (req, res) => {
    try {
        const { id } = req.params;
        const { supplier_id, debt_sup_amount } = req.body;

        const debt = await DebtSup.findByPk(id);

        if (!debt) {
            return res.status(404).json({ message: 'Debt record not found.' });
        }

        debt.supplier_id = supplier_id || debt.supplier_id;
        debt.debt_sup_amount = debt_sup_amount || debt.debt_sup_amount;

        await debt.save();
        res.status(200).json(debt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE a debt record
const deleteDebt = async (req, res) => {
    try {
        const { id } = req.params;

        const debt = await DebtSup.findByPk(id);

        if (!debt) {
            return res.status(404).json({ message: 'Debt record not found.' });
        }

        await debt.destroy();
        res.status(200).json({ message: 'Debt record deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createDebt,
    getAllDebts,
    getDebtBySup,
    updateDebt,
    deleteDebt,
};
