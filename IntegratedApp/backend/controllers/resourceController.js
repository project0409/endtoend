const Resource = require('../models/Resource');
const { validationResult } = require('express-validator');

exports.createResource = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const resource = await Resource.create({ ...req.body, createdBy: req.user.id });
    res.status(201).json({ success: true, resource });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllResources = async (req, res) => {
  try {
    const { category, difficulty, type, skill } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;
    if (type) filter.type = type;
    if (skill) filter.skills = skill;

    const resources = await Resource.find(filter).populate('createdBy', 'name').sort({ createdAt: -1 });
    res.json({ success: true, count: resources.length, resources });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id).populate('createdBy', 'name profile');
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    res.json({ success: true, resource });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getResourcesByRole = async (req, res) => {
  try {
    const { role, company } = req.query;
    const filter = {};
    if (role) filter.roles = role;
    if (company) filter.companies = company;

    const resources = await Resource.find(filter).sort({ rating: -1 });
    res.json({ success: true, count: resources.length, resources });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateResource = async (req, res) => {
  try {
    let resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    if (resource.createdBy.toString() !== req.user.id.toString()) return res.status(403).json({ message: 'Not authorized' });

    resource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, resource });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) return res.status(404).json({ message: 'Resource not found' });
    if (resource.createdBy.toString() !== req.user.id.toString()) return res.status(403).json({ message: 'Not authorized' });

    await resource.deleteOne();
    res.json({ success: true, message: 'Resource deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
