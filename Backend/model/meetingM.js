const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '2h', // Auto delete room after 2 hours
  }
});

module.exports = mongoose.model('Meeting', meetingSchema);
