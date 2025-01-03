const express = require('express');
const router = express.Router();
const AdjustmentController = require('../../controllers/AdjustmentController');
const { isAdminAuthenticated } = require('../../middleware/auth');

router.post('/', isAdminAuthenticated, AdjustmentController.createAdjustment);
router.get('/', isAdminAuthenticated, AdjustmentController.getAllAdjustments);
router.get('/product/:product_id', isAdminAuthenticated, AdjustmentController.getAdjustmentsByProduct);

module.exports = router;