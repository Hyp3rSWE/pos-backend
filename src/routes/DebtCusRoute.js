const express = require('express');
const {
    getAllDebts,
    getDebtByCus,
    createDebt,
    updateDebt,
    deleteDebt,
    subtractDebt,
} = require('../controllers/DebtsController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Debts
 *   description: Debt management operations
 */

/**
 * @swagger
 * path:
 *  /debts:
 *    get:
 *      summary: Get all debts
 *      tags: [Debts]
 *      responses:
 *        200:
 *          description: List of all debts
 *        500:
 *          description: Internal Server Error
 */
router.get('/', getAllDebts);

/**
 * @swagger
 * path:
 *  /debts/{id}:
 *    get:
 *      summary: Get debt by customer ID
 *      tags: [Debts]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Customer ID to fetch debts for
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Debt records for the customer
 *        404:
 *          description: No debts found for the given customer
 *        500:
 *          description: Internal Server Error
 */
router.get('/:id', getDebtByCus);

/**
 * @swagger
 * path:
 *  /debts:
 *    post:
 *      summary: Create a new debt record
 *      tags: [Debts]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                customer_id:
 *                  type: string
 *                  description: The customer ID
 *                debt_cus_amount:
 *                  type: number
 *                  format: float
 *                  description: The debt amount
 *                debt_cus_timestamp:
 *                  type: string
 *                  format: date-time
 *                  description: The timestamp of the debt
 *      responses:
 *        201:
 *          description: Debt record created successfully
 *        400:
 *          description: Missing required fields
 *        500:
 *          description: Internal Server Error
 */
router.post('/', createDebt);

/**
 * @swagger
 * path:
 *  /debts/{customer_id}:
 *    patch:
 *      summary: Subtract debt for a customer
 *      tags: [Debts]
 *      parameters:
 *        - in: path
 *          name: customer_id
 *          required: true
 *          description: Customer ID to update the debt for
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                amount:
 *                  type: number
 *                  format: float
 *                  description: The amount to subtract from the debt
 *      responses:
 *        201:
 *          description: Debt subtracted successfully and new record created
 *        400:
 *          description: Invalid amount provided
 *        404:
 *          description: No debt record found for this customer
 *        500:
 *          description: Internal Server Error
 */
router.patch('/:customer_id', subtractDebt);

/**
 * @swagger
 * path:
 *  /debts/{customer_id}/{time}:
 *    put:
 *      summary: Update a debt record for a customer
 *      tags: [Debts]
 *      parameters:
 *        - in: path
 *          name: customer_id
 *          required: true
 *          description: Customer ID for the debt record
 *          schema:
 *            type: string
 *        - in: path
 *          name: time
 *          required: true
 *          description: The timestamp of the debt to update
 *          schema:
 *            type: string
 *            format: date-time
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                debt_cus_amount:
 *                  type: number
 *                  format: float
 *                  description: New debt amount
 *      responses:
 *        200:
 *          description: Debt record updated successfully
 *        404:
 *          description: Debt record not found
 *        500:
 *          description: Internal Server Error
 */
router.put('/:customer_id/:time', updateDebt);

/**
 * @swagger
 * path:
 *  /debts/{customer_id}/{time}:
 *    delete:
 *      summary: Delete a debt record
 *      tags: [Debts]
 *      parameters:
 *        - in: path
 *          name: customer_id
 *          required: true
 *          description: Customer ID for the debt record to delete
 *          schema:
 *            type: string
 *        - in: path
 *          name: time
 *          required: true
 *          description: Timestamp of the debt record to delete
 *          schema:
 *            type: string
 *            format: date-time
 *      responses:
 *        200:
 *          description: Debt record deleted successfully
 *        404:
 *          description: Debt record not found
 *        500:
 *          description: Internal Server Error
 */
router.delete('/:customer_id/:time', deleteDebt);

module.exports = router;
