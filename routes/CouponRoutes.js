const CouponController = require('../controllers/CouponController.js')
const upload = require('../useMulter/uploadConfig.js')
const router = require('express').Router()

router.post('/addcoupon', upload.single('file') , CouponController.addCoupon)
router.get('/allcoupon', CouponController.getAllCoupon)
//router.get('/OneUser/:id', userController.getOneUser)
router.put('/updatecoupon/:id', upload.single('file') , CouponController.updateCoupon)
//router.delete('/deleteUser/:id', userController.deleteUser)

module.exports = router