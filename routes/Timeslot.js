const Timeslot = require('../controllers/Timeslot_Controller')
const router = require('express').Router()

router.get('/getTimeSlot/:weekday', Timeslot.getTimeSlot);

module.exports = router