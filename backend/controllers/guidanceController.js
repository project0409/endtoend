const PreparationChecklist = require('../models/PreparationChecklist');

// Get preparation guidance by company and role
exports.getPreparationGuidance = async (req, res) => {
  try {
    const { company, jobRole } = req.query;

    if (!company || !jobRole) {
      return res.status(400).json({
        error: 'Company and jobRole are required',
      });
    }

    let guidance = await PreparationChecklist.findOne({ company, jobRole });

    if (!guidance) {
      // Create default guidance if not exists
      guidance = new PreparationChecklist({
        company,
        jobRole,
        topics: [
          {
            name: 'Core Fundamentals',
            description: 'Master the core concepts',
            resources: [],
            difficulty: 'beginner',
          },
        ],
        technicalSkills: [],
        softSkills: [],
        estimatedPreparationTime: 30,
      });
      await guidance.save();
    }

    res.json(guidance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create guidance
exports.createGuidance = async (req, res) => {
  try {
    const guidance = new PreparationChecklist(req.body);
    await guidance.save();

    res.status(201).json({
      message: 'Preparation guidance created successfully',
      guidance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update guidance
exports.updateGuidance = async (req, res) => {
  try {
    const guidance = await PreparationChecklist.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!guidance) {
      return res.status(404).json({ error: 'Guidance not found' });
    }

    res.json({
      message: 'Guidance updated successfully',
      guidance,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all guidelines
exports.getAllGuidelines = async (req, res) => {
  try {
    const guidelines = await PreparationChecklist.find().sort({ createdAt: -1 });

    res.json({
      count: guidelines.length,
      guidelines,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
