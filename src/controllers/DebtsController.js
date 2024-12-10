const DebtCus = require('../models/DebtCus');
const Customer = require('../models/Customer');

// CREATE a new debt record
const createDebt = async (req, res) => {
    try {
        const { customer_id, debt_cus_amount } = req.body;
        
        if (!customer_id || !debt_cus_amount) {
            return res.status(400).json({ message: 'Customer ID and debt amount are required.' });
        }

        const newDebt = await DebtCus.create({
            customer_id,
            debt_cus_amount,
        });

        res.status(201).json(newDebt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// READ all debt records
const getAllDebts = async (req, res) => {
    try {
        const debts = await DebtCus.findAll({
            include: [
                {
                    model: Customer,
                    as: 'Customer', 
                },
            ],
        });

        res.status(200).json(debts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// READ a single debt record by ID
const getDebtByCus = async (req, res) => {
    try {
        const { id } = req.params;

        const debt = await DebtCus.findByPk(id, {
            include: [
                {
                    model: Customer,
                    as: 'Customer',
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
        const { customer_id, debt_cus_amount } = req.body;

        const debt = await DebtCus.findByPk(id);

        if (!debt) {
            return res.status(404).json({ message: 'Debt record not found.' });
        }

        debt.customer_id = customer_id || debt.customer_id;
        debt.debt_cus_amount = debt_cus_amount || debt.debt_cus_amount;

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

        const debt = await DebtCus.findByPk(id);

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
    updateDebt,
    deleteDebt,
    getDebtByCus,
};
