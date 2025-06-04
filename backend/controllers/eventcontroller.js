
const Event = require('../models/event');

const createEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create event', error: err.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ events });
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve events', error: err.message });
  }
};

module.exports = {
  createEvent,
  getEvents
};
