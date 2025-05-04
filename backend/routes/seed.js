const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Week = require('../models/Week');
const Task = require('../models/Task');
const plan = require('../seed').plan; // Import the plan from seed.js
const seedDatabase = require('../seed').seedDatabase; // Import seed function

// Temporary route to seed the database
router.post('/run', async (req, res) => {
  try {
    await seedDatabase();
    res.status(200).json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ error: 'Failed to seed database' });
  }
});

module.exports = router;
