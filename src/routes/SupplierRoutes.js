const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/SupplierController');

/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Supplier]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *       500:
 *         description: Internal server error
 */
router.post('/', supplierController.createSupplier);

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Supplier]
 *     responses:
 *       200:
 *         description: A list of suppliers
 *       500:
 *         description: Internal server error
 */
router.get('/', supplierController.getAllSuppliers);

/**
 * @swagger
 * /suppliers/{id}:
 *   get:
 *     summary: Get a supplier by ID
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The supplier ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A supplier object
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', supplierController.getSupplierById);

/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     summary: Update a supplier by ID
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The supplier ID
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', supplierController.updateSupplier);

/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Delete a supplier by ID
 *     tags: [Supplier]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The supplier ID
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Supplier deleted successfully
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;
