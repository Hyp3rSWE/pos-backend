const DebtSup = require("../models/DebtSup");
const Supplier = require("../models/Supplier");

// CREATE a new debt record
const createDebt = async (req, res) => {
    try {
        const { supplier_id, debt_sup_amount, debt_sup_timestamp } = req.body;

        if (!supplier_id || !debt_sup_amount || !debt_sup_timestamp) {
            return res
                .status(400)
                .json({ message: "Supplier ID and debt amount are required." });
        }

        const newDebt = await DebtSup.create({
            supplier_id,
            debt_sup_amount,
            debt_sup_timestamp,
        });

        res.status(201).json(newDebt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const subtractDebt = async (req, res) => {
    const { supplier_id } = req.params;
    const { amount } = req.body; // Amount to subtract from the supplier's debt

    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ message: 'Invalid amount provided.' });
    }

    try {
        // Fetch the last debt record for the supplier
        const lastDebt = await DebtSup.findOne({
            where: { supplier_id },
            order: [['debt_sup_timestamp', 'DESC']],
        });

        if (!lastDebt) {
            return res.status(404).json({ message: 'No debt record found for this supplier.' });
        }

        // Calculate the new debt amount
        let newDebtAmount = lastDebt.debt_sup_amount - amount;

        // Ensure the debt does not go negative
        if (newDebtAmount < 0) {
            newDebtAmount = 0;
        }

        // Insert a new debt record with the updated amount
        const newDebt = await DebtSup.create({
            supplier_id,
            debt_sup_amount: newDebtAmount,
            debt_sup_timestamp: new Date().toISOString(),
        });

        // Update the supplier's debt in the Supplier table
        const supplier = await Supplier.findByPk(supplier_id);
        if (supplier) {
            supplier.supplier_debt = newDebtAmount;
            await supplier.save();
        }

        res.status(201).json({
            message: 'Debt subtracted and new record created successfully.',
            newDebt,
        });
    } catch (error) {
        console.error('Error subtracting debt:', error);
        res.status(500).json({ message: 'Internal server error.', error });
    }
};

// READ all debt records
const getAllDebts = async (req, res) => {
    try {
        const debts = await DebtSup.findAll({
            include: [
                {
                    model: Supplier,
                    as: "Supplier",
                },
            ],
        });

        res.status(200).json(debts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// READ all debt records for a specific supplier
const getDebtBySup = async (req, res) => {
    try {
        const { id } = req.params;

        const debts = await DebtSup.findAll({
            where: { supplier_id: id },
            include: [
                {
                    model: Supplier,
                    as: "Supplier",
                },
            ],
        });

        if (debts.length === 0) {
            return res
                .status(404)
                .json({ message: "No debts found for this supplier." });
        }

        res.status(200).json(debts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// UPDATE a debt record by supplier_id and timestamp
const updateDebt = async (req, res) => {
    try {
        const { supplier_id, time } = req.params;
        const { debt_sup_amount } = req.body;

        // Ensure the timestamp is in the correct format
        const formattedTime = new Date(time).toISOString();

        const debt = await DebtSup.findOne({
            where: {
                supplier_id: supplier_id,
                debt_sup_timestamp: formattedTime,
            },
        });

        if (!debt) {
            return res.status(404).json({ message: "Debt record not found." });
        }

        debt.debt_sup_amount = debt_sup_amount || debt.debt_sup_amount;

        await debt.save();
        res.status(200).json(debt);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// DELETE a debt record by supplier_id and timestamp
const deleteDebt = async (req, res) => {
    try {
        const { supplier_id, time } = req.params;

        console.log(
            "Deleting debt with supplier_id:",
            supplier_id,
            "and timestamp:",
            time
        );

        // Ensure the timestamp is in the correct format
        const formattedTime = new Date(time).toISOString();

        const debt = await DebtSup.findOne({
            where: {
                supplier_id: supplier_id,
                debt_sup_timestamp: formattedTime,
            },
        });

        if (!debt) {
            console.log(
                "Debt record not found for supplier_id:",
                supplier_id,
                "and timestamp:",
                formattedTime
            );
            return res.status(404).json({ message: "Debt record not found." });
        }

        await debt.destroy();
        res.status(200).json({ message: "Debt record deleted successfully." });
    } catch (error) {
        console.error("Error deleting debt:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createDebt,
    getAllDebts,
    getDebtBySup,
    updateDebt,
    deleteDebt,
    subtractDebt
};
