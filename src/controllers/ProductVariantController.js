const ProductVariant = require('../models/ProductVariant');
const Product = require('../models/Product');

class ProductVariantController {
    /**
     * Retrieve all product variants with product details.
     */
    static async getAllProductVariants(req, res) {
        try {
            const variants = await ProductVariant.findAll({
                include: [{ model: Product, attributes: ['product_name', 'product_price', 'product_stock_level'] }],
            });
            res.status(200).json(variants);
        } catch (error) {
            console.error('Error fetching product variants:', error);
            res.status(500).json({ error: 'Failed to fetch product variants' });
        }
    }

    /**
     * Retrieve a product variant by its ID.
     */
    static async getProductVariantById(req, res) {
        try {
            const { id } = req.params;
            const variant = await ProductVariant.findByPk(id, {
                include: [{ model: Product, attributes: ['product_name', 'product_price', 'product_stock_level'] }],
            });

            if (!variant) {
                return res.status(404).json({ error: 'Product variant not found' });
            }

            res.status(200).json(variant);
        } catch (error) {
            console.error('Error fetching product variant:', error);
            res.status(500).json({ error: 'Failed to fetch product variant' });
        }
    }

    /**
     * Create a new product variant.
     */
    static async createProductVariant(req, res) {
        const { product_id, variant_barcode, variant_price, variant_quantity, variant_stock_level } = req.body;

        try {
            const product = await Product.findByPk(product_id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            // Update the product's stock level
            const additionalStock = variant_stock_level * variant_quantity;
            const newProductStockLevel = product.product_stock_level + additionalStock;

            await product.update({ product_stock_level: newProductStockLevel });

            // Create the new product variant
            const variant = await ProductVariant.create({
                product_id,
                variant_barcode,
                variant_price,
                variant_quantity,
                variant_stock_level,
            });

            // Update all product variants' stock levels
            const productVariants = await ProductVariant.findAll({
                where: { product_id: product.product_id }
            });

            await Promise.all(productVariants.map(async (variant) => {
                const newVariantStockLevel = Math.floor(newProductStockLevel / variant.variant_quantity);
                await variant.update({ variant_stock_level: newVariantStockLevel });
            }));

            res.status(201).json({ message: 'Product variant created successfully', variant });
        } catch (error) {
            console.error('Error creating product variant:', error);
            res.status(500).json({ error: 'Failed to create product variant' });
        }
    }

    /**
     * Update an existing product variant.
     */
    static async updateProductVariant(req, res) {
        const { id } = req.params;
        const { variant_price, variant_quantity, variant_stock_level } = req.body;

        try {
            const variant = await ProductVariant.findByPk(id);

            if (!variant) {
                return res.status(404).json({ error: 'Product variant not found' });
            }

            await variant.update({ variant_price, variant_quantity, variant_stock_level });

            res.status(200).json({ message: 'Product variant updated successfully', variant });
        } catch (error) {
            console.error('Error updating product variant:', error);
            res.status(500).json({ error: 'Failed to update product variant' });
        }
    }

    /**
     * Delete a product variant.
     */
    static async deleteProductVariant(req, res) {
        const { id } = req.params;

        try {
            const variant = await ProductVariant.findByPk(id);

            if (!variant) {
                return res.status(404).json({ error: 'Product variant not found' });
            }

            await variant.destroy();
            res.status(200).json({ message: 'Product variant deleted successfully' });
        } catch (error) {
            console.error('Error deleting product variant:', error);
            res.status(500).json({ error: 'Failed to delete product variant' });
        }
    }
}

module.exports = ProductVariantController;
