 
const express = require("express");
const router = express.Router();
const Doctor = require("../model/Doctor");
router.get("/doctorfetch", async (req, res) => {
  try {
    const { specialty } = req.query;
    if (!specialty) {
      return res.status(400).json({ message: "Specialty query required" });
    }
 
const doctors = await Doctor.find({
  specialization: { $regex: `\\b${specialty.trim()}\\b`, $options: 'i' }
});


    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
