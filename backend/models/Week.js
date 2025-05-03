const mongoose = require('mongoose');

const WeekSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  topics: [{ type: String }],
  reflection: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Week', WeekSchema);
