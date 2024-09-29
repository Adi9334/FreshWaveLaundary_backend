const riderWalletTransactionsController = require('../controllers/rider_wallet_transactions_Controller');

const router = require('express').Router();


router.post('/riderWalletTransaction', riderWalletTransactionsController.addRiderWalletTransaction);
router.get('/riderWalletTransactions', riderWalletTransactionsController.getAllRiderWalletTransactions);
router.get('/riderWalletTransaction/:id', riderWalletTransactionsController.getRiderWalletTransactionById);
router.put('/riderWalletTransaction/:id', riderWalletTransactionsController.updateRiderWalletTransaction);
router.delete('/riderWalletTransaction/:id', riderWalletTransactionsController.deleteRiderWalletTransaction);

module.exports = router;
