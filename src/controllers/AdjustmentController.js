const Adjustment = require('../models/Adjustment');
const Product = require('../models/Product');
const ProductVariant = require('../models/ProductVariant');
const { sequelize } = require('../config/db');

class AdjustmentController {
    static async createAdjustment(req, res) {
        const t = await sequelize.transaction();
        try {
            const { user_id, product_id, product_variant_id, new_quantity, adjustment_reason } = req.body;

            // Get the current product or variant
            let currentItem;
            if (product_variant_id) {
                currentItem = await ProductVariant.findByPk(product_variant_id, { transaction: t });
                if (!currentItem) {
                    throw new Error('Product variant not found');
                }
            } else {
                currentItem = await Product.findByPk(product_id, { transaction: t });
                if (!currentItem) {
                    throw new Error('Product not found');
                }
            }

            // Create adjustment record
            const adjustment = await Adjustment.create({
                user_id,
                product_id,
                product_variant_id,
                previous_quantity: product_variant_id ? currentItem.variant_stock_level : currentItem.product_stock_level,
                new_quantity,
                adjustment_reason
            }, { transaction: t });

            // Update stock levels
            if (product_variant_id) {
                await currentItem.update({
                    variant_stock_level: new_quantity
                }, { transaction: t });

                // Update parent product stock level
                const product = await Product.findByPk(currentItem.product_id, { transaction: t });
                const variants = await ProductVariant.findAll({
                    where: { product_id: currentItem.product_id },
                    transaction: t
                });

                const totalStock = variants.reduce((sum, variant) => {
                    return sum + (variant.variant_stock_level * variant.variant_quantity);
                }, 0);

                await product.update({
                    product_stock_level: totalStock
                }, { transaction: t });
            } else {
                await currentItem.update({
                    product_stock_level: new_quantity
                }, { transaction: t });

                // Update all variants
                const variants = await ProductVariant.findAll({
                    where: { product_id },
                    transaction: t
                });

                for (const variant of variants) {
                    const newVariantStock = Math.floor(new_quantity / variant.variant_quantity);
                    await variant.update({
                        variant_stock_level: newVariantStock
                    }, { transaction: t });
                }
            }

            await t.commit();
            res.status(201).json(adjustment);
        } catch (error) {
            await t.rollback();
            res.status(500).json({ error: error.message });
        }
    }

    static async getAllAdjustments(req, res) {
        try {
            const adjustments = await Adjustment.findAll({
                include: [
                    { model: Product, attributes: ['product_name'] },
                    { model: ProductVariant, attributes: ['variant_barcode'] }
                ]
            });
            res.status(200).json(adjustments);
        } catch (error) {
            console.error('Error fetching adjustments:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async getAdjustmentsByProduct(req, res) {
        try {
            const { product_id } = req.params;
            const adjustments = await Adjustment.findAll({
                where: { product_id },
                include: [
                    { model: Product, attributes: ['product_name'] },
                    { model: ProductVariant, attributes: ['variant_barcode'] }
                ]
            });
            res.status(200).json(adjustments);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = AdjustmentController;