const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  qualification: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  specialization: {
    type: String,
    required: true
  },
  fees: {
    type: Number,
    required: true,
    min: 0
  },
  timings: {
    type: String, 
    required: true
  }
});

module.exports = mongoose.model("Doctors", doctorSchema, 'Doctors');
