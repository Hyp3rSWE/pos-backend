const express = require("express");
const router = express.Router();
const InvoiceLineController = require("../controllers/InvoiceLineController");

router.get("/", InvoiceLineController.getAllInvoiceLines);
router.get("/:invoice_cus_id/:product_id/:product_variant_id", InvoiceLineController.getInvoiceLineById);
router.post("/", InvoiceLineController.createInvoiceLine);
router.put("/:invoice_cus_id/:product_id/:product_variant_id", InvoiceLineController.updateInvoiceLine); // Added update route
router.delete("/:invoice_cus_id/:product_id/:product_variant_id", InvoiceLineController.deleteInvoiceLine);

module.exports = router;