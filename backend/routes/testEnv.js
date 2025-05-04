const express = require('express');
const router = express.Router();

router.get('/env', (req, res) => {
  res.json({ MONGO_URL: process.env.MONGO_URL || null });
});

module.exports = router;
