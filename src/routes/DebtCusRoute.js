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
router.put('/:id/:time', updateDebt);
router.delete('/:id', deleteDebt);

module.exports = router;
