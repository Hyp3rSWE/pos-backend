const express = require('express');
const {
    getAllDebts,
    getDebtById,
    createDebt,
    updateDebt,
    deleteDebt,
} = require('../controllers/DebtsController'); 

const router = express.Router();

router.get('/', getAllDebts);
router.get('/:id', getDebtById);
router.post('/', createDebt);
router.put('/:id', updateDebt);
router.delete('/:id', deleteDebt);

module.exports = router;
