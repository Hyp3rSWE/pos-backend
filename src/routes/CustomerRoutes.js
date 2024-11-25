const express = require('express');
const { getCustomers, getCustomer, addCustomer, updateCustomer, deleteCustomer } = require('../controllers/customerController');
const router = express.Router();

router.get('/', getCustomers);
router.get('/:customer_id', getCustomer);
router.post('/', addCustomer);
router.put('/:customer_id', updateCustomer);
router.delete('/:customer_id', deleteCustomer);

module.exports = router;