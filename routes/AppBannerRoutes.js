const AppBanner_Controller = require('../controllers/AppBannerController.js')
const upload = require('../useMulter/uploadConfig.js')
const router = require('express').Router()

router.post('/addBanner',upload.single('file') ,AppBanner_Controller.addBanner)
router.get('/allBanner', AppBanner_Controller.getAllBanner)
router.put('/updateBanner/:id', upload.single('file'),AppBanner_Controller.updateBanner)
// router.delete('/deleteUser/:id', userController.deleteUser)

module.exports = router