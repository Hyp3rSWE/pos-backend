const express = require("express");
const SupplierController = require("../controllers/SupplierController");

class SupplierRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", SupplierController.getAllSuppliers);
        this.router.get("/:id", SupplierController.getSupplierById);
        this.router.post("/", SupplierController.createSupplier);
        this.router.put("/:id", SupplierController.updateSupplier);
        this.router.delete("/:id", SupplierController.deleteSupplier);
    }
}

module.exports = new SupplierRoutes().router;
