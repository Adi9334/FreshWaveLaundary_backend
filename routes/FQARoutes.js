const fqaController = require('../controllers/FQAController.js')
const router = require('express').Router()

router.post('/addfqa', fqaController.addfqa)
router.get('/allfqa', fqaController.getAllfqa)
//router.get('/OneUser/:id', userController.getOneUser)
router.put('/updatefqa/:id', fqaController.updatefqa)
//router.delete('/deleteUser/:id', userController.deleteUser)

module.exports = router