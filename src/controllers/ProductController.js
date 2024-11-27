const Product = require('../models/Product');
const Supplier = require('../models/Supplier');



// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { supplier_id, product_barcode, product_price, product_name, product_stock_level } = req.body;

        // Validate supplier existence
        const supplier = await Supplier.findByPk(supplier_id);
        if (!supplier) {
            return res.status(404).json({ message: 'Supplier not found' });
        }

        // Create the product
        const product = await Product.create({
            supplier_id,
            product_barcode,
            product_price,
            product_name,
            product_stock_level,
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll({
            include: { model: Supplier, attributes: ['supplier_name'] }, // Include supplier details
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            include: { model: Supplier, attributes: ['supplier_name'] },
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

// Update a product
exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { supplier_id, product_barcode, product_price, product_name, product_stock_level } = req.body;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Validate supplier existence (if updated)
        if (supplier_id) {
            const supplier = await Supplier.findByPk(supplier_id);
            if (!supplier) {
                return res.status(404).json({ message: 'Supplier not found' });
            }
        }

        // Update product
        await product.update({
            supplier_id,
            product_barcode,
            product_price,
            product_name,
            product_stock_level,
        });

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await product.destroy();
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};