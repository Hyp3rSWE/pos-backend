const express = require("express");
const ProductVariantController = require("../controllers/ProductVariantController");

const router = express.Router();

router.get("/", ProductVariantController.getAllProductVariants);
router.post("/", ProductVariantController.createProductVariant);
router.get("/:id", ProductVariantController.getProductVariantById);
router.put("/:id", ProductVariantController.updateProductVariant);
router.delete("/:id", ProductVariantController.deleteProductVariant);

module.exports = router;
