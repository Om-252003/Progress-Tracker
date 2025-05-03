const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Note = require('../models/Note');

// Get all tasks, with optional status filter
router.get('/', async (req, res) => {
  try {
    const { status, week } = req.query;
    let filter = {};
    if (status) filter.status = status;
    if (week) filter.week = week;
    const tasks = await Task.find(filter).populate('notes');
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get task by id
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('notes');
    if (!task) return res.status(404).json({ message: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new task
router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a task
router.put('/:id', async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTask) return res.status(404).json({ message: 'Task not found' });
    res.json(updatedTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a task and its notes
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    await Note.deleteMany({ task: task._id });
    await task.remove();
    res.json({ message: 'Task and associated notes deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
