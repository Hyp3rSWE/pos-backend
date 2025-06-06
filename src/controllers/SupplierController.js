const Supplier = require("../models/Supplier");
const Product = require("../models/Product");

/**
 * @swagger
 * components:
 *   schemas:
 *     Supplier:
 *       type: object
 *       properties:
 *         supplier_id:
 *           type: integer
 *         supplier_name:
 *           type: string
 *         supplier_phone:
 *           type: string
 *       required:
 *         - supplier_name
 *         - supplier_phone
 */

class SupplierController {
    // Get all suppliers
    static async getAllSuppliers(req, res) {
        try {
            const suppliers = await Supplier.findAll();
            res.status(200).json(suppliers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a supplier by ID
    static async getSupplierById(req, res) {
        const { id } = req.params;
        try {
            const supplier = await Supplier.findByPk(id);
            if (!supplier) {
                return res.status(404).json({ message: "Supplier not found" });
            }
            res.status(200).json(supplier);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Create a new supplier
    static async createSupplier(req, res) {
        const { supplier_name, supplier_phone , supplier_debt } = req.body;
        try {
            const newSupplier = await Supplier.create({
                supplier_name,
                supplier_phone,
                supplier_debt,
            });
            res.status(201).json(newSupplier);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update a supplier
    static async updateSupplier(req, res) {
        const { id } = req.params;
        const { supplier_name, supplier_phone , supplier_debt } = req.body;
        try {
            const supplier = await Supplier.findByPk(id);
            if (!supplier) {
                return res.status(404).json({ message: "Supplier not found" });
            }
            await supplier.update({ supplier_name, supplier_phone  , supplier_debt});
            res.status(200).json(supplier);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete a supplier
    static async deleteSupplier(req, res) {
        const { id } = req.params;
        try {
            const supplier = await Supplier.findByPk(id);
            if (!supplier) {
                return res.status(404).json({ message: "Supplier not found" });
            }
            await supplier.destroy();
            res.status(204).json({ message: "Supplier deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get all products for a supplier
    static async getSupplierProducts(req, res) {
        try {
            const { id } = req.params;
            const supplier = await Supplier.findByPk(id, {
                include: [{
                    model: Product,
                    attributes: [
                        'product_id',
                        'product_name',
                        'product_barcode',
                        'product_price',
                        'product_stock_level'
                    ]
                }]
            });

            if (!supplier) {
                return res.status(404).json({ message: "Supplier not found" });
            }

            res.status(200).json(supplier.Products);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = SupplierController;
