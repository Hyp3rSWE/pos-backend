const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: CRUD operations for managing products
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplier_id:
 *                 type: integer
 *               product_barcode:
 *                 type: string
 *               product_price:
 *                 type: number
 *               product_cost:
 *                 type: number
 *               product_name:
 *                 type: string
 *               product_stock_level:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product created successfully
 *       500:
 *         description: Error creating product
 */
router.post("/", productController.createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *       500:
 *         description: Error fetching products
 */
router.get("/", productController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error fetching product
 */
router.get("/:id", productController.getProductById);

/**
 * @swagger
 * /products/barcode/{barcode}:
 *   get:
 *     summary: Get a product by barcode
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: barcode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error fetching product by barcode
 */
router.get("/barcode/:barcode", productController.getProductByBarcode);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Products]
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
 *               supplier_id:
 *                 type: integer
 *               product_barcode:
 *                 type: string
 *               product_price:
 *                 type: number
 *               product_name:
 *                 type: string
 *               product_stock_level:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error updating product
 */
router.put("/:id", productController.updateProduct);

/**
 * @swagger
 * /products/updateQuantity/{id}:
 *   put:
 *     summary: Update product stock quantity
 *     tags: [Products]
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
 *               new_product_stock_level:
 *                 type: integer
 *               new_cost:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product stock level and cost updated successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error updating product quantity
 */
router.put("/updateQuantity/:id", productController.updateQuantity);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error deleting product
 */
router.delete("/:id", productController.deleteProduct);

/**
 * @swagger
 * /products/{id}/supplier:
 *   get:
 *     summary: Get the supplier of a product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Supplier details
 *       404:
 *         description: Product not found
 *       500:
 *         description: Error fetching product supplier
 */
router.get('/:id/supplier', productController.getProductSupplier);

module.exports = router;
