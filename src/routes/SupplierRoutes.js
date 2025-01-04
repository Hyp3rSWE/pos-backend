const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/SupplierController");

/**
 * @swagger
 * tags:
 *   name: Suppliers
 *   description: Operations related to suppliers
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
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *       500:
 *         description: Failed to create supplier
 */
router.post("/", supplierController.createSupplier);

/**
 * @swagger
 * /suppliers:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Suppliers]
 *     responses:
 *       200:
 *         description: List of all suppliers
 *       500:
 *         description: Failed to fetch suppliers
 */
router.get("/", supplierController.getAllSuppliers);

/**
 * @swagger
 * /suppliers/{id}:
 *   get:
 *     summary: Get a supplier by ID
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the supplier to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Supplier found
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Failed to fetch supplier
 */
router.get("/:id", supplierController.getSupplierById);

/**
 * @swagger
 * /suppliers/{id}:
 *   put:
 *     summary: Update a supplier
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the supplier to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Supplier'
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Failed to update supplier
 */
router.put("/:id", supplierController.updateSupplier);

/**
 * @swagger
 * /suppliers/{id}:
 *   delete:
 *     summary: Delete a supplier
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the supplier to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Supplier deleted successfully
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Failed to delete supplier
 */
router.delete("/:id", supplierController.deleteSupplier);

/**
 * @swagger
 * /suppliers/{id}/products:
 *   get:
 *     summary: Get all products for a supplier
 *     tags: [Suppliers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the supplier to retrieve products for
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of products for the supplier
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Failed to fetch products
 */
router.get('/:id/products', supplierController.getSupplierProducts);

module.exports = router;
