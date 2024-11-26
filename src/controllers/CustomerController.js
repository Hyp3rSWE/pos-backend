// In your customerController.js
const { Customer } = require('../models/Customer');  // Ensure this is the correct import

const createCustomer = async (req, res) => {
  try {
    const { customer_name, customer_phone } = req.body;

    // Validate the input
    if (!customer_name || !customer_phone) {
      return res.status(400).json({ message: 'Customer name and phone are required' });
    }

    // Create the customer record
    const newCustomer = await Customer.create({
      customer_name,
      customer_phone,
    });

    // Respond with the created customer
    return res.status(201).json(newCustomer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    return res.status(200).json(customers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    return res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { customer_name, customer_phone, customer_debt } = req.body;

    const customer = await Customer.findByPk(id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Update customer information
    customer.customer_name = customer_name || customer.customer_name;
    customer.customer_phone = customer_phone || customer.customer_phone;
    customer.customer_debt = customer_debt || customer.customer_debt;

    await customer.save();
    return res.status(200).json(customer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByPk(id);

    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    await customer.destroy();
    return res.status(200).json({ message: 'Customer deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer
};