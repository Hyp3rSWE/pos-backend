const express = require('express');
const {
    getAllDebts,
    getDebtBySup,
    createDebt,
    updateDebt,
    deleteDebt,
} = require('../controllers/DebtsSuppController'); 


const router = express.Router();

router.get('/', getAllDebts);
router.get('/:id', getDebtBySup);
router.post('/', createDebt);
router.put('/:supplier_id/:time', updateDebt);
router.delete('/:supplier_id/:time', deleteDebt);

module.exports = router;
