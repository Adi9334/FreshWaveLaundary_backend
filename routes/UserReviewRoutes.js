const UserReviewController = require('../controllers/UserReviewController.js')
const router = require('express').Router()

router.post('/addreview', UserReviewController.addreview)
router.get('/allreview', UserReviewController.getAllreview)
//router.get('/OneUser/:id', userController.getOneUser)
router.put('/updatereview/:id', UserReviewController.updatereview)
//router.delete('/deleteUser/:id', userController.deleteUser)

module.exports = router