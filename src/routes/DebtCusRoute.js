const express = require('express');
const {
    getAllDebts,
    getDebtByCus,
    createDebt,
    updateDebt,
    deleteDebt,
    subtractDebt,
} = require('../controllers/DebtsController');

const router = express.Router();

router.get('/', getAllDebts);
router.get('/:id', getDebtByCus);
router.post('/', createDebt);
router.patch('/:customer_id', subtractDebt);
router.put('/:customer_id/:time', updateDebt);
router.delete('/:customer_id/:time', deleteDebt);

module.exports = router;
