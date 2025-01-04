const express = require("express");
const ProductVariantController = require("../controllers/ProductVariantController");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ProductVariants
 *   description: CRUD operations for managing product variants
 */

/**
 * @swagger
 * /productVariants:
 *   get:
 *     summary: Retrieve all product variants with product details
 *     tags: [ProductVariants]
 *     responses:
 *       200:
 *         description: List of product variants
 *       500:
 *         description: Failed to fetch product variants
 */
router.get("/", ProductVariantController.getAllProductVariants);

/**
 * @swagger
 * /productVariants:
 *   post:
 *     summary: Create a new product variant
 *     tags: [ProductVariants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: integer
 *               variant_barcode:
 *                 type: string
 *               variant_price:
 *                 type: number
 *               variant_quantity:
 *                 type: integer
 *               variant_stock_level:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product variant created successfully
 *       500:
 *         description: Failed to create product variant
 */
router.post("/", ProductVariantController.createProductVariant);

/**
 * @swagger
 * /productVariants/{id}:
 *   get:
 *     summary: Retrieve a product variant by its ID
 *     tags: [ProductVariants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product variant details
 *       404:
 *         description: Product variant not found
 *       500:
 *         description: Failed to fetch product variant
 */
router.get("/:id", ProductVariantController.getProductVariantById);

/**
 * @swagger
 * /productVariants/{id}:
 *   put:
 *     summary: Update an existing product variant
 *     tags: [ProductVariants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               variant_price:
 *                 type: number
 *               variant_quantity:
 *                 type: integer
 *               variant_stock_level:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product variant updated successfully
 *       404:
 *         description: Product variant not found
 *       500:
 *         description: Failed to update product variant
 */
router.put("/:id", ProductVariantController.updateProductVariant);

/**
 * @swagger
 * /productVariants/{id}:
 *   delete:
 *     summary: Delete a product variant
 *     tags: [ProductVariants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product variant deleted successfully
 *       404:
 *         description: Product variant not found
 *       500:
 *         description: Failed to delete product variant
 */
router.delete("/:id", ProductVariantController.deleteProductVariant);

module.exports = router;
