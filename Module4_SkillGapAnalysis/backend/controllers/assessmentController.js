const Assessment = require('../models/Assessment');
const { validationResult } = require('express-validator');

const calculateSkillGaps = (currentSkills, requiredSkills) => {
  const skillGaps = [];
  const proficiencyLevels = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };

  requiredSkills.forEach(required => {
    const current = currentSkills.find(s => s.skill.toLowerCase() === required.skill.toLowerCase());
    
    if (!current) {
      skillGaps.push({
        skill: required.skill,
        currentLevel: 'none',
        requiredLevel: required.proficiency || 'intermediate',
        priority: required.importance === 'must-have' ? 'high' : 'medium',
        recommendations: [`Learn ${required.skill} basics`, `Practice ${required.skill} regularly`]
      });
    } else {
      const currentLevel = proficiencyLevels[current.proficiency] || 0;
      const requiredLevel = proficiencyLevels[required.proficiency] || 2;
      
      if (currentLevel < requiredLevel) {
        skillGaps.push({
          skill: required.skill,
          currentLevel: current.proficiency,
          requiredLevel: required.proficiency,
          priority: required.importance === 'must-have' ? 'high' : 'medium',
          recommendations: [`Improve ${required.skill} from ${current.proficiency} to ${required.proficiency}`]
        });
      }
    }
  });

  return skillGaps;
};

const calculateOverallScore = (currentSkills, requiredSkills) => {
  if (requiredSkills.length === 0) return 0;
  
  const proficiencyLevels = { beginner: 1, intermediate: 2, advanced: 3, expert: 4 };
  let totalScore = 0;
  
  requiredSkills.forEach(required => {
    const current = currentSkills.find(s => s.skill.toLowerCase() === required.skill.toLowerCase());
    const requiredLevel = proficiencyLevels[required.proficiency] || 2;
    const currentLevel = current ? (proficiencyLevels[current.proficiency] || 0) : 0;
    
    const skillScore = (currentLevel / requiredLevel) * 100;
    totalScore += Math.min(skillScore, 100);
  });
  
  return Math.round(totalScore / requiredSkills.length);
};

const determineReadinessLevel = (score) => {
  if (score >= 80) return 'well-prepared';
  if (score >= 60) return 'ready';
  if (score >= 40) return 'needs-improvement';
  return 'not-ready';
};

exports.createAssessment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { targetRole, targetCompany, currentSkills, requiredSkills } = req.body;

    const skillGaps = calculateSkillGaps(currentSkills, requiredSkills);
    const overallScore = calculateOverallScore(currentSkills, requiredSkills);
    const readinessLevel = determineReadinessLevel(overallScore);

    const learningPath = skillGaps
      .sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      })
      .map((gap, index) => ({
        skill: gap.skill,
        resources: gap.recommendations,
        estimatedTime: gap.priority === 'high' ? '2-4 weeks' : '1-2 weeks',
        order: index + 1
      }));

    const assessment = await Assessment.create({
      userId: req.user.id,
      targetRole,
      targetCompany,
      currentSkills,
      requiredSkills,
      skillGaps,
      overallScore,
      readinessLevel,
      learningPath
    });

    res.status(201).json({ success: true, assessment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getUserAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find({ userId: req.user.id })
      .sort({ createdAt: -1 });

    res.json({ success: true, count: assessments.length, assessments });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAssessmentById = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    if (assessment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json({ success: true, assessment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateAssessment = async (req, res) => {
  try {
    let assessment = await Assessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    if (assessment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { currentSkills, requiredSkills } = req.body;

    if (currentSkills || requiredSkills) {
      const newCurrentSkills = currentSkills || assessment.currentSkills;
      const newRequiredSkills = requiredSkills || assessment.requiredSkills;

      const skillGaps = calculateSkillGaps(newCurrentSkills, newRequiredSkills);
      const overallScore = calculateOverallScore(newCurrentSkills, newRequiredSkills);
      const readinessLevel = determineReadinessLevel(overallScore);

      req.body.skillGaps = skillGaps;
      req.body.overallScore = overallScore;
      req.body.readinessLevel = readinessLevel;
    }

    assessment = await Assessment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json({ success: true, assessment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.deleteAssessment = async (req, res) => {
  try {
    const assessment = await Assessment.findById(req.params.id);

    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    if (assessment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await assessment.deleteOne();
    res.json({ success: true, message: 'Assessment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
