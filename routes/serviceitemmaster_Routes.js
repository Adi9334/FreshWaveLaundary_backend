const serviceitemmaster_Controller = require('../controllers/serviceitemmaster_Controller')
const router = require('express').Router()
const upload = require('../useMulter/uploadConfig')


router.post('/addItem', upload.single('file') , serviceitemmaster_Controller.addItem)
router.get('/allItem', serviceitemmaster_Controller.getAllItem)
router.get('/OneServiceItem/:id', serviceitemmaster_Controller.getOneService)
router.put('/updateServiceItem/:id',upload.single('file'), serviceitemmaster_Controller.updateService)
// router.delete('/deleteUser/:id', userController.deleteUser)

module.exports = router