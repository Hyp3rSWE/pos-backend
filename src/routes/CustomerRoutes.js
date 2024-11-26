const express = require('express');
const router = express.Router();
const customerController = require('../controllers/CustomerController');

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer
 *     tags: [Customer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_name:
 *                 type: string
 *               customer_phone:
 *                 type: string
 *               customer_debt:
 *                 type: number
 *                 format: double
 *                 default: 0.0
 *     responses:
 *       201:
 *         description: Customer created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', customerController.createCustomer);

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [Customer]
 *     responses:
 *       200:
 *         description: A list of customers
 *       500:
 *         description: Internal server error
 */
router.get('/', customerController.getAllCustomers);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The customer ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A customer object
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', customerController.getCustomerById);

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update a customer by ID
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The customer ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_name:
 *                 type: string
 *               customer_phone:
 *                 type: string
 *               customer_debt:
 *                 type: number
 *                 format: double
 *     responses:
 *       200:
 *         description: Customer updated successfully
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', customerController.updateCustomer);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     tags: [Customer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The customer ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 *       404:
 *         description: Customer not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', customerController.deleteCustomer);

module.exports = router;
