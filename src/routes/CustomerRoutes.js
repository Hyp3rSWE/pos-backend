const express = require("express");
const CustomerController = require("../controllers/CustomerController");

class CustomerRoutes {
    constructor() {
        this.router = express.Router();
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.router.get("/", CustomerController.getAllCustomers);
        this.router.get("/:id", CustomerController.getCustomerById);
        this.router.post("/", CustomerController.createCustomer);
        this.router.put("/:id", CustomerController.updateCustomer);
        this.router.delete("/:id", CustomerController.deleteCustomer);
    }
}

module.exports = new CustomerRoutes().router;
