const express = require('express');
const { v4: uuidv4 } = require('uuid');
const Meeting = require('../model/meetingM.js');
const router = express.Router();

// Create a new room
router.post('/create', async (req, res) => {
  try {
    const roomId = uuidv4();

    const newMeeting = new Meeting({ roomId });
    await newMeeting.save();

    res.status(201).json({ roomId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
