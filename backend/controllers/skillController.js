const SkillAssessment = require('../models/SkillAssessment');
const User = require('../models/User');

// Create skill assessment
exports.createSkillAssessment = async (req, res) => {
  try {
    const { skill, selfRating } = req.body;

    // Check if assessment already exists
    let assessment = await SkillAssessment.findOne({
      studentId: req.userId,
      skill,
    });

    if (assessment) {
      return res.status(400).json({
        error: 'Skill assessment for this skill already exists',
      });
    }

    assessment = new SkillAssessment({
      studentId: req.userId,
      skill,
      selfRating,
      status: 'not-started',
    });

    await assessment.save();

    res.status(201).json({
      message: 'Skill assessment created successfully',
      assessment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get my skill assessments
exports.getMySkillAssessments = async (req, res) => {
  try {
    const assessments = await SkillAssessment.find({
      studentId: req.userId,
    }).sort({ createdAt: -1 });

    res.json({
      count: assessments.length,
      assessments,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update skill assessment
exports.updateSkillAssessment = async (req, res) => {
  try {
    const assessment = await SkillAssessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }

    if (assessment.studentId.toString() !== req.userId) {
      return res.status(403).json({
        error: 'Not authorized to update this assessment',
      });
    }

    Object.assign(assessment, req.body);
    assessment.updatedAt = new Date();

    await assessment.save();

    res.json({
      message: 'Assessment updated successfully',
      assessment,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get skill gap analysis
exports.getSkillGapAnalysis = async (req, res) => {
  try {
    const assessments = await SkillAssessment.find({
      studentId: req.userId,
    });

    const gaps = assessments.map((assessment) => ({
      skill: assessment.skill,
      currentLevel: assessment.selfRating,
      gapStatus: assessment.selfRating < 3 ? 'HIGH_GAP' : 'MANAGEABLE',
    }));

    res.json({
      studentId: req.userId,
      totalSkillsAssessed: assessments.length,
      skillGaps: gaps,
      recommendations: gaps
        .filter((gap) => gap.gapStatus === 'HIGH_GAP')
        .map((gap) => `Focus on improving ${gap.skill}`),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete assessment
exports.deleteSkillAssessment = async (req, res) => {
  try {
    const assessment = await SkillAssessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({ error: 'Assessment not found' });
    }

    if (assessment.studentId.toString() !== req.userId) {
      return res.status(403).json({
        error: 'Not authorized to delete this assessment',
      });
    }

    await SkillAssessment.findByIdAndDelete(req.params.id);

    res.json({ message: 'Assessment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
