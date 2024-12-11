const express = require('express');
const {
    getAllDebts,
    getDebtByCus,
    createDebt,
    updateDebt,
    deleteDebt,
} = require('../controllers/DebtsController'); 

const router = express.Router();

router.get('/', getAllDebts);
router.get('/:id', getDebtByCus);
router.post('/', createDebt);
router.put('/:customer_id/:time', updateDebt);
router.delete('/:customer_id/:time', deleteDebt);

module.exports = router;
