const express = require("express");
const ProductVariantController = require("../controllers/ProductVariantController");


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ProductVariants
 *   description: product-variants endpoints
 */

/**
 * @swagger
 * /product-variants:
 *   post:
 *     summary: Create a new product variant
 *     tags: [ProductVariants]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductVariant'
 *     responses:
 *       201:
 *         description: Product variant created successfully
 */
router.post("/", ProductVariantController.createProductVariant);

/**
 * @swagger
 * /product-variants:
 *   get:
 *     summary: Retrieve all product variants
 *     tags: [ProductVariants]
 *     responses:
 *       200:
 *         description: List of product variants
 */
router.get("/", ProductVariantController.getAllProductVariants);

/**
 * @swagger
 * /product-variants/{id}:
 *   get:
 *     summary: Retrieve a specific product variant by ID
 *     tags: [ProductVariants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product variant to retrieve
 *     responses:
 *       200:
 *         description: Product variant details
 *       404:
 *         description: Product variant not found
 */
router.get(
    "/:id",
    ProductVariantController.getProductVariantById
);

/**
 * @swagger
 * /product-variants/{id}:
 *   put:
 *     summary: Update an existing product variant
 *     tags: [ProductVariants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product variant to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProductVariant'
 *     responses:
 *       200:
 *         description: Product variant updated successfully
 *       404:
 *         description: Product variant not found
 */
router.put(
    "/:id",
    ProductVariantController.updateProductVariant
);

/**
 * @swagger
 * /product-variants/{id}:
 *   delete:
 *     summary: Delete a product variant
 *     tags: [ProductVariants]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the product variant to delete
 *     responses:
 *       200:
 *         description: Product variant deleted successfully
 *       404:
 *         description: Product variant not found
 */
router.delete(
    "/:id",
    ProductVariantController.deleteProductVariant
);

module.exports = router;
