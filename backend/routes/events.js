
const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventcontroller');
const router = express.Router();

router.post('/', createEvent);

router.get('/', getEvents);

module.exports = router;
