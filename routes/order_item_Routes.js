const Order_Item_Controller = require('../controllers/Order_item_Controller.js')
const router = require('express').Router()

router.post('/addOrderItem', Order_Item_Controller.addOrderItem)
router.get('/allOrdersItem', Order_Item_Controller.getAllOrdersItem)
router.get('/OneOrderItem/:id', Order_Item_Controller.getOneOrderItem)
router.put('/updateOrderItem/:id', Order_Item_Controller.updateOrderItem)
// router.delete('/deleteUser/:id', userController.deleteUser)

module.exports = router