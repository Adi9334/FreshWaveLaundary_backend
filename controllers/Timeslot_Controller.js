const express = require('express');
const router = express.Router();
const { getslotService } = require('../services/Timeslot.js');

const getTimeSlot = async (req, res) => {
  try {
    const { weekday } = req.params; 
    const slots = await getslotService(weekday);
    res.status(200)
    res.json(slots);
  } catch (error) {
    console.error("Error in fetching active slots:", error);
    res.status(500).json({ error: 'Error fetching active slots' });
  }
};

module.exports = { getTimeSlot };
