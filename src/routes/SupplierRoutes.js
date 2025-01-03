const express = require("express");
const router = express.Router();
const supplierController = require("../controllers/SupplierController");

router.post("/", supplierController.createSupplier);
router.get("/", supplierController.getAllSuppliers);
router.get("/:id", supplierController.getSupplierById);
router.put("/:id", supplierController.updateSupplier);
router.delete("/:id", supplierController.deleteSupplier);
router.get('/:id/products', supplierController.getSupplierProducts);

module.exports = router;
