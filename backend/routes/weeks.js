const express = require('express');
const router = express.Router();
const Week = require('../models/Week');

// Get all weeks
router.get('/', async (req, res) => {
  try {
    const weeks = await Week.find().sort({ number: 1 });
    res.json(weeks);
  } catch (err) {
    console.error('Error in GET /api/weeks:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get week by number
router.get('/:number', async (req, res) => {
  try {
    const week = await Week.findOne({ number: req.params.number });
    if (!week) return res.status(404).json({ message: 'Week not found' });
    res.json(week);
  } catch (err) {
    console.error('Error in GET /api/weeks/:number:', err);
    res.status(500).json({ message: err.message });
  }
});

// Create or update a week
router.post('/', async (req, res) => {
  try {
    const { number, topics, reflection } = req.body;
    let week = await Week.findOne({ number });
    if (week) {
      week.topics = topics;
      week.reflection = reflection;
    } else {
      week = new Week({ number, topics, reflection });
    }
    const savedWeek = await week.save();
    res.status(201).json(savedWeek);
  } catch (err) {
    console.error('Error in POST /api/weeks:', err);
    res.status(400).json({ message: err.message });
  }
});

// Delete a week
router.delete('/:number', async (req, res) => {
  try {
    const week = await Week.findOneAndDelete({ number: req.params.number });
    if (!week) return res.status(404).json({ message: 'Week not found' });
    res.json({ message: 'Week deleted' });
  } catch (err) {
    console.error('Error in DELETE /api/weeks/:number:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
