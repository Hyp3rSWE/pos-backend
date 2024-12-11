const express = require("express");
const router = express.Router();
const InvoiceCusController = require("../controllers/InvoiceController");

router.get("/", InvoiceCusController.getAllInvoices);
router.get("/:invoice_id", InvoiceCusController.getInvoiceById);
router.post("/", InvoiceCusController.createInvoice);
router.put("/:invoice_id", InvoiceCusController.updateInvoice);
router.delete("/:invoice_id", InvoiceCusController.deleteInvoice);

module.exports = router;
