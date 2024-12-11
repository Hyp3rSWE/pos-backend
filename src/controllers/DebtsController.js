const DebtCus = require("../models/DebtCus");
const Customer = require("../models/Customer");

// CREATE a new debt record
const createDebt = async (req, res) => {
    try {
        const { customer_id, debt_cus_amount, debt_cus_timestamp } = req.body;

        if (!customer_id || !debt_cus_amount || !debt_cus_timestamp) {
            return res
                .status(400)
                .json({ message: "Customer ID and debt amount are required." });
        }

        const newDebt = await DebtCus.create({
            customer_id,
            debt_cus_amount,
            debt_cus_timestamp,
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
                    as: "Customer",
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

        const debts = await DebtCus.findAll({
            where: { customer_id: id },
            include: [
                {
                    model: Customer,
                    as: "Customer",
                },
            ],
        });

        if (debts.length === 0) {
            return res
                .status(404)
                .json({ message: "No debts found for this customer." });
        }

        res.status(200).json(debts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE a debt record
const updateDebt = async (req, res) => {
    try {
        const { customer_id, time } = req.params;
        const { debt_cus_amount } = req.body;

        // Ensure the timestamp is in the correct format
        const formattedTime = new Date(time).toISOString();

        const debt = await DebtCus.findOne({
            where: {
                customer_id: customer_id,
                debt_cus_timestamp: formattedTime,
            },
        });

        if (!debt) {
            return res.status(404).json({ message: "Debt record not found." });
        }

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
        const { customer_id, time } = req.params;

        // Ensure the timestamp is in the correct format
        const formattedTime = new Date(time).toISOString();

        const debt = await DebtCus.findOne({
            where: {
                customer_id: customer_id,
                debt_cus_timestamp: formattedTime,
            },
        });

        if (!debt) {
            return res.status(404).json({ message: "Debt record not found." });
        }

        await debt.destroy();
        res.status(200).json({ message: "Debt record deleted successfully." });
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
