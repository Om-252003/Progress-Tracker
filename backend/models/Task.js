const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  week: { type: Number, required: true },
  topic: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
  resources: [{ type: String }],
  status: { type: String, enum: ['Pending', 'In Progress', 'Done'], default: 'Pending' },
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }],
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
