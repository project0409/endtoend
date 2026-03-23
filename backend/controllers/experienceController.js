const Experience = require('../models/Experience');

// Share Interview Experience
exports.shareExperience = async (req, res) => {
  try {
    const {
      company,
      jobRole,
      interviewType,
      round,
      questionsAsked,
      skillsRequired,
      preparationTips,
      interviewExperience,
      result,
      rating,
      resourcesUsed,
    } = req.body;

    const experience = new Experience({
      employeeId: req.userId,
      company,
      jobRole,
      interviewType,
      round,
      questionsAsked,
      skillsRequired,
      preparationTips,
      interviewExperience,
      result,
      rating,
      resourcesUsed,
    });

    await experience.save();
    await experience.populate('employeeId', 'name email company');

    res.status(201).json({
      message: 'Experience shared successfully',
      experience,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get experiences by company and role
exports.getExperiencesByCompanyRole = async (req, res) => {
  try {
    const { company, jobRole } = req.query;

    const query = {};
    if (company) query.company = company;
    if (jobRole) query.jobRole = jobRole;

    const experiences = await Experience.find(query).populate(
      'employeeId',
      'name email yearsOfExperience'
    );

    res.json({
      count: experiences.length,
      experiences,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all unique companies
exports.getCompanies = async (req, res) => {
  try {
    const companies = await Experience.distinct('company');
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all job roles for a company
exports.getJobRolesByCompany = async (req, res) => {
  try {
    const { company } = req.params;
    const roles = await Experience.distinct('jobRole', { company });
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single experience
exports.getExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id).populate(
      'employeeId',
      'name email yearsOfExperience'
    );

    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    res.json(experience);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update experience
exports.updateExperience = async (req, res) => {
  try {
    let experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    if (experience.employeeId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to update this experience' });
    }

    experience = await Experience.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      message: 'Experience updated successfully',
      experience,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete experience
exports.deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    if (experience.employeeId.toString() !== req.userId) {
      return res.status(403).json({ error: 'Not authorized to delete this experience' });
    }

    await Experience.findByIdAndDelete(req.params.id);

    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get my experiences
exports.getMyExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({ employeeId: req.userId }).sort({
      createdAt: -1,
    });

    res.json({
      count: experiences.length,
      experiences,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
