const Experience = require('../models/Experience');
const { validationResult } = require('express-validator');

exports.createExperience = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const experience = await Experience.create({ ...req.body, userId: req.user.id });
    res.status(201).json({ success: true, experience });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllExperiences = async (req, res) => {
  try {
    const { company, role, difficulty, interviewType } = req.query;
    const filter = {};
    if (company) filter.company = new RegExp(company, 'i');
    if (role) filter.role = new RegExp(role, 'i');
    if (difficulty) filter.difficulty = difficulty;
    if (interviewType) filter.interviewType = interviewType;

    const experiences = await Experience.find(filter)
      .populate('userId', 'name profile.company profile.position')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: experiences.length, experiences });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id)
      .populate('userId', 'name profile.company profile.position');
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    res.json({ success: true, experience });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, count: experiences.length, experiences });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateExperience = async (req, res) => {
  try {
    let experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    if (experience.userId.toString() !== req.user.id.toString()) return res.status(403).json({ message: 'Not authorized' });

    experience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, experience });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) return res.status(404).json({ message: 'Experience not found' });
    if (experience.userId.toString() !== req.user.id.toString()) return res.status(403).json({ message: 'Not authorized' });

    await experience.deleteOne();
    res.json({ success: true, message: 'Experience deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
