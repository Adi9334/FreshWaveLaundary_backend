const servicemaster_Controller = require('../controllers/servicemaster_Controller')
const router = require('express').Router()
const upload = require('../useMulter/uploadConfig')


router.post('/addService', upload.single('file') ,servicemaster_Controller.addService)
router.get('/allService', servicemaster_Controller.getAllService)
router.get('/OneService/:id', servicemaster_Controller.getOneService)
router.put('/updateService/:id',upload.single('file'), servicemaster_Controller.updateService)
// router.delete('/deleteUser/:id', userController.deleteUser)

module.exports = router