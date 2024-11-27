const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/SupplierController");

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: API for managing suppliers
 */

/**
 * @swagger
 * /suppliers:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Suppliers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplier_name:
 *                 type: string
 *               supplier_phone:
 *                 type: string
 *             required:
 *               - supplier_name
 *               - supplier_phone
 *     responses:
 *       201:
 *         description: The supplier was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       500:
 *         description: Server error
 */
router.post("/", supplierController.createSupplier);

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Retrieve a list of all suppliers
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: A list of suppliers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Supplier'
 *       500:
 *         description: Server error
 */
router.get("/", supplierController.getAllSuppliers);

/**
 * @swagger
 * /suppliers/{id}:
 *   get:
 *     summary: Retrieve a single supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The supplier ID
 *     responses:
 *       200:
 *         description: A single supplier
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
router.get("/:id", supplierController.getSupplierById);

/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     summary: Update a supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The supplier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               supplier_name:
 *                 type: string
 *               supplier_phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: The supplier was updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Supplier'
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
router.put("/:id", supplierController.updateSupplier);

/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Delete a supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The supplier ID
 *     responses:
 *       204:
 *         description: Supplier deleted successfully
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", supplierController.deleteSupplier);

module.exports = router;
