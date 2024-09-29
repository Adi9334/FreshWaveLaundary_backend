const riderWalletController = require('../controllers/rider_wallet_Controller.js');
const router = require('express').Router();

router.post('/riderWallet', riderWalletController.addRiderWallet);
router.get('/riderWallets', riderWalletController.getAllRiderWallets);
router.get('/riderWallet/:id', riderWalletController.getRiderWalletById);
router.put('/riderWallet/:id', riderWalletController.updateRiderWallet);
router.delete('/riderWallet/:id', riderWalletController.deleteRiderWallet);

module.exports = router;
