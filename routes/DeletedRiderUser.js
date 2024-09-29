const userController = require('../controllers/DeletedRiderUserController')
const router = require('express').Router()

router.post('/adddeleterideruser', userController.addUsers)
router.get('/alldeleteriderusers', userController.getAllUsers)
router.get('/Onedeleterideruser/:id', userController.getOneUser)
router.put('/updateddeleterideruser/:id', userController.updateUser)
router.delete('/deleterideruser/:id', userController.deleteUser)

module.exports = router