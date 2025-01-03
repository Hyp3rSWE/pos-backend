const Product = require('../models/Product');
const Supplier = require('../models/Supplier');
const ProductVariant = require('../models/ProductVariant');


// Create a new product
exports.createProduct = async (req, res) => {
    try {
        const { supplier_id, product_barcode, product_price, product_cost, product_name, product_stock_level } = req.body;

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
            product_cost,
            product_name,
            product_stock_level,
        });

        // Find and update all product variants associated with the new product
        const productVariants = await ProductVariant.findAll({
            where: { product_id: product.product_id }
        });

        await Promise.all(productVariants.map(async (variant) => {
            const newVariantStockLevel = Math.floor(product_stock_level / variant.variant_quantity);
            await variant.update({ variant_stock_level: newVariantStockLevel });
        }));

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



// Get a product by barcode
exports.getProductByBarcode = async (req, res) => {
    try {
        const { barcode } = req.params;
        const product = await Product.findOne({
            where: { product_barcode: barcode },
            include: { model: Supplier, attributes: ['supplier_name'] },
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product by barcode', error: error.message });
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



exports.updateQuantity = async (req, res) => {
    try {
        const { id } = req.params;
        const { new_product_stock_level, new_cost } = req.body;


        // Fetch the existing product
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Get the old cost and old stock level
        const old_cost = product.product_cost;
        const old_product_stock_level = product.product_stock_level;

        cost = 0;
        if (new_cost == null) {
            cost = old_cost;
        }
        else {
            // Calculate the new weighted average cost
            cost = (old_cost * old_product_stock_level + new_cost * new_product_stock_level) / (old_product_stock_level + new_product_stock_level);

        }

        // Update the product with the new stock level and the newly calculated cost
        await product.update({
            product_stock_level: new_product_stock_level + old_product_stock_level,
            product_cost: cost,
        });

        // Respond with the updated product
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

// Add this method to get supplier details for a product
exports.getProductSupplier = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            include: [{ 
                model: Supplier,
                attributes: ['supplier_id', 'supplier_name', 'supplier_phone'] 
            }]
        });

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product.Supplier);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product supplier', error: error.message });
    }
};
