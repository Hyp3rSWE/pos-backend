const express = require("express");
const router = express.Router();
const InvoiceSupController = require("../controllers/InvoiceSupController");

router.get("/", InvoiceSupController.getAllInvoices);
router.get("/sup-:sup_id", InvoiceSupController.getInvoiceBySupId);
router.get("/:invoice_sup_id", InvoiceSupController.getInvoiceById);
router.post("/", InvoiceSupController.createInvoice);
router.put("/:invoice_sup_id", InvoiceSupController.updateInvoice);
router.delete("/:invoice_sup_id", InvoiceSupController.deleteInvoice);

module.exports = router;
