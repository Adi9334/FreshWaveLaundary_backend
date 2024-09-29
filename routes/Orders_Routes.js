const Orders_Controller = require('../controllers/Orders_Controller.js')
const router = require('express').Router()

router.post('/addOrder', Orders_Controller.addOrder)
router.get('/allOrders', Orders_Controller.getAllOrders)
router.get('/getOrder/:id', Orders_Controller.getAllAssignedOrders)
router.get('/OrderDetail/:id', Orders_Controller.getOrderDetails)
router.put('/updateOrder/:id', Orders_Controller.updateOrder)
// router.delete('/deleteUser/:id', userController.deleteUser)

module.exports = router