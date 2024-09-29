const Address_Controller = require('../controllers/Address_Controller.js')
const router = require('express').Router()

router.post('/addAddress', Address_Controller.addAddress)
router.get('/allAddress', Address_Controller.getAllAddress)
router.get('/address/:id', Address_Controller.getOneAddress)
router.get('/AddressDetail/:user_id', Address_Controller.getAddressDetails)
router.put('/updateAddress/:id', Address_Controller.updateAddress)
// router.delete('/deleteUser/:id', userController.deleteUser)

module.exports = router