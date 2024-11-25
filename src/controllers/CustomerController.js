const Customer = require('../models/Customer');

const getCustomers = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        res.json(customers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Other CRUD methods: getCustomer, addCustomer, updateCustomer, deleteCustomer

module.exports = { getCustomers, getCustomer, addCustomer, updateCustomer, deleteCustomer };