const express = require('express');
const router = express.Router();
const AdjustmentController = require('../controllers/AdjustmentController');

/**
 * @swagger
 * /adjustments:
 *   post:
 *     summary: Create a new adjustment record.
 *     tags:
 *       - Adjustments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 description: ID of the user making the adjustment.
 *               product_id:
 *                 type: integer
 *                 description: ID of the product.
 *               product_variant_id:
 *                 type: integer
 *                 description: ID of the product variant (optional).
 *               new_quantity:
 *                 type: integer
 *                 description: New stock quantity.
 *               adjustment_reason:
 *                 type: string
 *                 description: Reason for the adjustment.
 *     responses:
 *       201:
 *         description: Adjustment created successfully.
 *       500:
 *         description: Internal server error.
 */
router.post('/', AdjustmentController.createAdjustment);

/**
 * @swagger
 * /adjustments:
 *   get:
 *     summary: Retrieve all adjustment records.
 *     tags:
 *       - Adjustments
 *     responses:
 *       200:
 *         description: Successfully retrieved all adjustments.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   product_id:
 *                     type: integer
 *                   product_variant_id:
 *                     type: integer
 *                   previous_quantity:
 *                     type: integer
 *                   new_quantity:
 *                     type: integer
 *                   adjustment_reason:
 *                     type: string
 *       500:
 *         description: Internal server error.
 */
router.get('/', AdjustmentController.getAllAdjustments);

/**
 * @swagger
 * /adjustments/product/{product_id}:
 *   get:
 *     summary: Retrieve adjustments for a specific product.
 *     tags:
 *       - Adjustments
 *     parameters:
 *       - in: path
 *         name: product_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to fetch adjustments for.
 *     responses:
 *       200:
 *         description: Successfully retrieved adjustments for the specified product.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   product_id:
 *                     type: integer
 *                   product_variant_id:
 *                     type: integer
 *                   previous_quantity:
 *                     type: integer
 *                   new_quantity:
 *                     type: integer
 *                   adjustment_reason:
 *                     type: string
 *       500:
 *         description: Internal server error.
 */
router.get('/product/:product_id', AdjustmentController.getAdjustmentsByProduct);

module.exports = router;
