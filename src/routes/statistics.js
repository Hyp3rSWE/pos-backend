const express = require('express');
const StatisticsController = require('../controllers/StatisticsController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Statistics
 *   description: Operations related to statistics
 */

/**
 * @swagger
 * /statistics/total-stock:
 *   get:
 *     summary: Retrieve the total stock value (cost * quantity of all products)
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Total stock value
 *       500:
 *         description: Failed to calculate total stock value
 */
router.get('/total-stock', StatisticsController.getTotalStock);

/**
 * @swagger
 * /statistics/total-supplier-debt:
 *   get:
 *     summary: Retrieve the total supplier debt
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Total supplier debt
 *       500:
 *         description: Failed to calculate total supplier debt
 */
router.get('/total-supplier-debt', StatisticsController.getTotalSupplierDebt);

/**
 * @swagger
 * /statistics/total-customer-debt:
 *   get:
 *     summary: Retrieve the total customer debt
 *     tags: [Statistics]
 *     responses:
 *       200:
 *         description: Total customer debt
 *       500:
 *         description: Failed to calculate total customer debt
 */
router.get('/total-customer-debt', StatisticsController.getTotalCustomerDebt);

module.exports = router;
