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
router.put('/:id/:time', updateDebt);
router.delete('/:id', deleteDebt);

module.exports = router;
