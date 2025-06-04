const express = require('express');
const router = express.Router();
const { registerAttendee, getAttendeesByEvent } = require('../controllers/attendeecontroller');

router.post('/register', registerAttendee);

router.get('/event/:eventId', getAttendeesByEvent);

module.exports = router;
