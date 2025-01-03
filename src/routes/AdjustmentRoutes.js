const express = require('express');
const router = express.Router();
const AdjustmentController = require('../controllers/AdjustmentController');

router.post('/', AdjustmentController.createAdjustment);
router.get('/',  AdjustmentController.getAllAdjustments);
router.get('/product/:product_id', AdjustmentController.getAdjustmentsByProduct);

module.exports = router;