const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    name: String,
    specialty: String,
    fees: Number,
  },
  fees: {
    type: Number,
    required: true,
  },
  timing: {
    type: String,
    required: true,
  },
  paymentInfo: {
    id: String,
    status: String,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
