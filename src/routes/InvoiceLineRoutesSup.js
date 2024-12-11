const express = require("express");
const router = express.Router();
const InvoiceLineSupController = require("../controllers/InvoiceLineSupController");

router.get("/", InvoiceLineSupController.getAllInvoiceLines);
router.get(
    "/:invoice_sup_id/:product_id/:product_variant_id",
    InvoiceLineSupController.getInvoiceLineById
);
router.post("/", InvoiceLineSupController.createInvoiceLine);
router.delete(
    "/:invoice_sup_id/:product_id/:product_variant_id",
    InvoiceLineSupController.deleteInvoiceLine
);

module.exports = router;
