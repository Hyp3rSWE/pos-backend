const express = require("express");
const router = express.Router();
const InvoiceLineSupController = require("../controllers/InvoiceLineSupController");

router.get("/", InvoiceLineSupController.getAllInvoiceLines);
router.get(
    "/:invoice_sup_id/:product_id/:product_variant_id",
    InvoiceLineSupController.getInvoiceLineById
);
router.get(
    "/:invoice_sup_id",
    InvoiceLineSupController.getAllInvoiceLinesByInvoiceID
);
router.post("/", InvoiceLineSupController.createInvoiceLine);
router.put(
    "/:invoice_sup_id/:product_id/:product_variant_id",
    InvoiceLineSupController.updateInvoiceLine
); // Added update route
router.delete(
    "/:invoice_sup_id/:product_id/:product_variant_id",
    InvoiceLineSupController.deleteInvoiceLine
);

module.exports = router;
