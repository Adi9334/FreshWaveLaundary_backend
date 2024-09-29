const userController = require('../controllers/DeletedUsersController.js')
const router = require('express').Router()

router.post('/adddeleteuser', userController.addUsers)
router.get('/alldeleteUsers', userController.getAllUsers)
router.get('/OnedeleteUser/:id', userController.getOneUser)
router.put('/updateddeleteUser/:id', userController.updateUser)
router.delete('/deleteUser/:id', userController.deleteUser)

module.exports = router