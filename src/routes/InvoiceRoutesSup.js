const express = require("express");
const router = express.Router();
const InvoiceSupController = require("../controllers/InvoiceSupController");

router.get("/", InvoiceSupController.getAllInvoices);
router.get("/:invoice_id", InvoiceSupController.getInvoiceById);
router.post("/", InvoiceSupController.createInvoice);
router.put("/:invoice_id", InvoiceSupController.updateInvoice);
router.delete("/:invoice_id", InvoiceSupController.deleteInvoice);

module.exports = router;
