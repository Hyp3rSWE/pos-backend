const express = require("express");
const router = express.Router();
const productController = require("../controllers/ProductController");


/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Customers endpoints
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
 *                 format: float
 *               product_name:
 *                 type: string
 *               product_stock_level:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Product created successfully
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Internal server error
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
 *         description: A list of products
 *       500:
 *         description: Internal server error
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
 *         description: The product ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A product object
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
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
 *         description: The product barcode
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A product object
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.get("/barcode/:barcode", productController.getProductByBarcode);


/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID
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
 *                 format: float
 *               product_name:
 *                 type: string
 *               product_stock_level:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       404:
 *         description: Product or supplier not found
 *       500:
 *         description: Internal server error
 */
router.put("/:id", productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The product ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", productController.deleteProduct);

module.exports = router;
