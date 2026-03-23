const SkillDatabase = require('../models/SkillDatabase');
const { validationResult } = require('express-validator');

exports.createSkillSet = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const skillSet = await SkillDatabase.create(req.body);
    res.status(201).json({ success: true, skillSet });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getSkillsByRole = async (req, res) => {
  try {
    const { role, company, experienceLevel } = req.query;
    const filter = {};

    if (role) filter.role = new RegExp(role, 'i');
    if (company) filter.company = new RegExp(company, 'i');
    if (experienceLevel) filter.experienceLevel = experienceLevel;

    const skillSets = await SkillDatabase.find(filter);

    res.json({ success: true, count: skillSets.length, skillSets });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllSkillSets = async (req, res) => {
  try {
    const skillSets = await SkillDatabase.find().sort({ createdAt: -1 });
    res.json({ success: true, count: skillSets.length, skillSets });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getSkillSetById = async (req, res) => {
  try {
    const skillSet = await SkillDatabase.findById(req.params.id);

    if (!skillSet) {
      return res.status(404).json({ message: 'Skill set not found' });
    }

    res.json({ success: true, skillSet });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateSkillSet = async (req, res) => {
  try {
    const skillSet = await SkillDatabase.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!skillSet) {
      return res.status(404).json({ message: 'Skill set not found' });
    }

    res.json({ success: true, skillSet });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteSkillSet = async (req, res) => {
  try {
    const skillSet = await SkillDatabase.findById(req.params.id);

    if (!skillSet) {
      return res.status(404).json({ message: 'Skill set not found' });
    }

    await skillSet.deleteOne();
    res.json({ success: true, message: 'Skill set deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
