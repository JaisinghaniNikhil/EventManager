const Attendee = require('../models/attendee');

exports.registerAttendee = async (req, res) => {
  const { name, age, eventId } = req.body;

  if (!name || !age || !eventId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newAttendee = new Attendee({ name, age, eventId });
    await newAttendee.save();
    res.status(201).json({ message: 'Attendee registered successfully', attendee: newAttendee });
  } catch (error) {
    console.error('Error registering attendee:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getAttendeesByEvent = async (req, res) => {
  const { eventId } = req.params;
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 5; 
  const skip = (page - 1) * limit;

  try {
    const attendees = await Attendee.find({ eventId })
      .skip(skip)
      .limit(limit);

    const totalCount = await Attendee.countDocuments({ eventId });

    res.status(200).json({
      attendees,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    });
  } catch (error) {
    console.error('Error fetching attendees:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
