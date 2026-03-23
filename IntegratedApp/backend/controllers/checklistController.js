const Checklist = require('../models/Checklist');
const { validationResult } = require('express-validator');

exports.createChecklist = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const checklist = await Checklist.create({ ...req.body, userId: req.user.id });
    res.status(201).json({ success: true, checklist });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserChecklists = async (req, res) => {
  try {
    const checklists = await Checklist.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, count: checklists.length, checklists });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getChecklistById = async (req, res) => {
  try {
    const checklist = await Checklist.findById(req.params.id);
    if (!checklist) return res.status(404).json({ message: 'Checklist not found' });
    if (checklist.userId.toString() !== req.user.id.toString()) return res.status(403).json({ message: 'Not authorized' });
    res.json({ success: true, checklist });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateChecklist = async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id);
    if (!checklist) return res.status(404).json({ message: 'Checklist not found' });
    if (checklist.userId.toString() !== req.user.id.toString()) return res.status(403).json({ message: 'Not authorized' });

    checklist = await Checklist.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, checklist });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.toggleChecklistItem = async (req, res) => {
  try {
    const { itemId } = req.body;
    const checklist = await Checklist.findById(req.params.id);
    if (!checklist) return res.status(404).json({ message: 'Checklist not found' });
    if (checklist.userId.toString() !== req.user.id.toString()) return res.status(403).json({ message: 'Not authorized' });

    const item = checklist.items.id(itemId);
    if (item) {
      item.completed = !item.completed;
      item.completedAt = item.completed ? new Date() : null;
      await checklist.save();
    }
    res.json({ success: true, checklist });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteChecklist = async (req, res) => {
  try {
    const checklist = await Checklist.findById(req.params.id);
    if (!checklist) return res.status(404).json({ message: 'Checklist not found' });
    if (checklist.userId.toString() !== req.user.id.toString()) return res.status(403).json({ message: 'Not authorized' });

    await checklist.deleteOne();
    res.json({ success: true, message: 'Checklist deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
