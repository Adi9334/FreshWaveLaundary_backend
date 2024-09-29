const riderUserController = require('../controllers/riderUser_Controller.js');
const router = require('express').Router();

router.post('/login', riderUserController.login);
router.post('/addRiderUser', riderUserController.addRiderUser);
router.get('/allRiderUsers', riderUserController.getAllRiderUsers);
router.get('/OneRiderUser/:id', riderUserController.getOneRiderUser);
router.put('/updateRiderUser/:id', riderUserController.updateRiderUser);
router.delete('/deleteRiderUser/:id', riderUserController.deleteRiderUser);
router.put('/resetPassword/:id', riderUserController.resetPassword);

module.exports = router;
