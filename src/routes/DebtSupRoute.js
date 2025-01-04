const express = require('express');
const {
    getAllDebts,
    getDebtBySup,
    createDebt,
    updateDebt,
    deleteDebt,
    subtractDebt
} = require('../controllers/DebtsSuppController');

const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all debt records.
 *     tags: [Debts]
 *     responses:
 *       200:
 *         description: A list of all debt records.
 *       500:
 *         description: Internal server error.
 */
router.get('/', getAllDebts);

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get all debt records for a specific supplier.
 *     tags: [Debts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the supplier.
 *     responses:
 *       200:
 *         description: List of debt records for the specified supplier.
 *       404:
 *         description: No debts found for this supplier.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', getDebtBySup);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new debt record.
 *     tags: [Debts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplier_id:
 *                 type: integer
 *               debt_sup_amount:
 *                 type: number
 *               debt_sup_timestamp:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Debt record created successfully.
 *       400:
 *         description: Invalid input.
 *       500:
 *         description: Internal server error.
 */
router.post('/', createDebt);

/**
 * @swagger
 * /{supplier_id}:
 *   patch:
 *     summary: Subtract a specific amount from the latest debt of a supplier.
 *     tags: [Debts]
 *     parameters:
 *       - in: path
 *         name: supplier_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the supplier.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *     responses:
 *       201:
 *         description: Debt subtracted and new record created successfully.
 *       400:
 *         description: Invalid input or amount.
 *       404:
 *         description: No debt record found for the supplier.
 *       500:
 *         description: Internal server error.
 */
router.patch('/:supplier_id', subtractDebt);

/**
 * @swagger
 * /{supplier_id}/{time}:
 *   put:
 *     summary: Update a debt record by supplier ID and timestamp.
 *     tags: [Debts]
 *     parameters:
 *       - in: path
 *         name: supplier_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the supplier.
 *       - in: path
 *         name: time
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: Timestamp of the debt record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               debt_sup_amount:
 *                 type: number
 *     responses:
 *       200:
 *         description: Debt record updated successfully.
 *       404:
 *         description: Debt record not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/:supplier_id/:time', updateDebt);

/**
 * @swagger
 * /{supplier_id}/{time}:
 *   delete:
 *     summary: Delete a debt record by supplier ID and timestamp.
 *     tags: [Debts]
 *     parameters:
 *       - in: path
 *         name: supplier_id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the supplier.
 *       - in: path
 *         name: time
 *         schema:
 *           type: string
 *           format: date-time
 *         required: true
 *         description: Timestamp of the debt record.
 *     responses:
 *       200:
 *         description: Debt record deleted successfully.
 *       404:
 *         description: Debt record not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:supplier_id/:time', deleteDebt);

module.exports = router;
