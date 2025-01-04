const express = require("express");
const router = express.Router();
const customerController = require("../controllers/CustomerController");

/**
 * @swagger
 * /customers:
 *   post:
 *     summary: Create a new customer.
 *     tags:
 *       - Customers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_name:
 *                 type: string
 *                 description: Name of the customer.
 *               customer_phone:
 *                 type: string
 *                 description: Phone number of the customer.
 *               customer_debt:
 *                 type: number
 *                 description: Customer's debt amount.
 *     responses:
 *       201:
 *         description: Customer created successfully.
 *       500:
 *         description: Internal server error.
 */
router.post("/", customerController.createCustomer);

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get a list of all customers.
 *     tags:
 *       - Customers
 *     responses:
 *       200:
 *         description: Successfully retrieved customers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Customer ID.
 *                   customer_name:
 *                     type: string
 *                     description: Name of the customer.
 *                   customer_phone:
 *                     type: string
 *                     description: Phone number of the customer.
 *                   customer_debt:
 *                     type: number
 *                     description: Customer's debt amount.
 *       500:
 *         description: Internal server error.
 */
router.get("/", customerController.getAllCustomers);

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get details of a customer by ID.
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the customer to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved customer details.
 *       404:
 *         description: Customer not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", customerController.getCustomerById);

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update details of a customer.
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the customer to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customer_name:
 *                 type: string
 *                 description: Updated name of the customer.
 *               customer_phone:
 *                 type: string
 *                 description: Updated phone number of the customer.
 *               customer_debt:
 *                 type: number
 *                 description: Updated debt amount of the customer.
 *     responses:
 *       200:
 *         description: Customer updated successfully.
 *       404:
 *         description: Customer not found.
 *       500:
 *         description: Internal server error.
 */
router.put("/:id", customerController.updateCustomer);

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete a customer by ID.
 *     tags:
 *       - Customers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the customer to delete.
 *     responses:
 *       204:
 *         description: Customer deleted successfully.
 *       404:
 *         description: Customer not found.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", customerController.deleteCustomer);

module.exports = router;
