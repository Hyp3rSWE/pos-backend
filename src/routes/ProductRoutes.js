const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');
const { isAdminAuthenticated, isCashierAuthenticated } = require('../middleware/auth');


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
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
router.post('/', isAdminAuthenticated,productController.createProduct);

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: A list of products
 *       500:
 *         description: Internal server error
 */
router.get('/', isAdminAuthenticated,productController.getAllProducts);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Product]
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
router.get('/:id',isAdminAuthenticated, productController.getProductById);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Product]
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
router.put('/:id', isAdminAuthenticated,productController.updateProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Product]
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
router.delete('/:id', isAdminAuthenticated,productController.deleteProduct);

module.exports = router;