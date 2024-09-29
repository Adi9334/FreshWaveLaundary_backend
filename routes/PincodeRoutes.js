const Pincode_Controller = require('../controllers/PincodeController.js')
const router = require('express').Router()

router.post('/addPincode', Pincode_Controller.addPincode)
router.get('/allPincode', Pincode_Controller.getAllPincode)
router.put('/updatePincode/:id', Pincode_Controller.updatePincode)
// router.delete('/deleteUser/:id', userController.deleteUser)

module.exports = router