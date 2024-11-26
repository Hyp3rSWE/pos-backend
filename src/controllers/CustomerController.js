const Customer = require("../models/Customer");

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
 *       type: object
 *       properties:
 *         customer_id:
 *           type: integer
 *         customer_name:
 *           type: string
 *         customer_phone:
 *           type: string
 *         customer_debt:
 *           type: number
 *       required:
 *         - customer_name
 *         - customer_phone
 */

class CustomerController {
    // Get all customers
    static async getAllCustomers(req, res) {
        try {
            const customers = await Customer.findAll();
            res.status(200).json(customers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get a customer by ID
    static async getCustomerById(req, res) {
        const { id } = req.params;
        try {
            const customer = await Customer.findByPk(id);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Create a new customer
    static async createCustomer(req, res) {
        const { customer_name, customer_phone, customer_debt } = req.body;
        try {
            const newCustomer = await Customer.create({
                customer_name,
                customer_phone,
                customer_debt,
            });
            res.status(201).json(newCustomer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Update a customer
    static async updateCustomer(req, res) {
        const { id } = req.params;
        const { customer_name, customer_phone, customer_debt } = req.body;
        try {
            const customer = await Customer.findByPk(id);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
            await customer.update({
                customer_name,
                customer_phone,
                customer_debt,
            });
            res.status(200).json(customer);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // Delete a customer
    static async deleteCustomer(req, res) {
        const { id } = req.params;
        try {
            const customer = await Customer.findByPk(id);
            if (!customer) {
                return res.status(404).json({ message: "Customer not found" });
            }
            await customer.destroy();
            res.status(204).json({ message: "Customer deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = CustomerController;
