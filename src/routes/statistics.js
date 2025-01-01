const express = require('express');
const StatisticsController = require('../controllers/StatisticsController');

const router = express.Router();

// Define routes
router.get('/total-stock', StatisticsController.getTotalStock);
router.get('/total-supplier-debt', StatisticsController.getTotalSupplierDebt);
router.get('/total-customer-debt', StatisticsController.getTotalCustomerDebt);

module.exports = router;
