const Recommendation = require('../models/Recommendation');
const Experience = require('../models/Experience');
const SkillAssessment = require('../models/SkillAssessment');

// Generate recommendation
exports.generateRecommendation = async (req, res) => {
  try {
    const { targetCompany, targetRole } = req.body;

    if (!targetCompany || !targetRole) {
      return res.status(400).json({
        error: 'targetCompany and targetRole are required',
      });
    }

    // Get related experiences
    const relatedExperiences = await Experience.find({
      company: targetCompany,
      jobRole: targetRole,
    });

    // Get student's skill assessments
    const studentSkills = await SkillAssessment.find({
      studentId: req.userId,
    });

    // Extract unique skills from experiences
    const requiredSkills = [
      ...new Set(
        relatedExperiences.flatMap((exp) => exp.skillsRequired || [])
      ),
    ];

    // Calculate skill gaps
    const skillGaps = requiredSkills.map((skill) => {
      const assessment = studentSkills.find(
        (sa) => sa.skill.toLowerCase() === skill.toLowerCase()
      );
      return {
        skill,
        currentLevel: assessment?.selfRating || 1,
        targetLevel: 4,
      };
    });

    // Create learning path
    const recommendedLearningPath = skillGaps
      .sort((a, b) => a.currentLevel - b.currentLevel)
      .map((gap, index) => ({
        step: index + 1,
        topic: gap.skill,
        duration: '1-2 weeks',
        resources: [
          'Udemy courses',
          'LeetCode',
          'GeeksforGeeks',
          'YouTube tutorials',
        ],
        priority: gap.currentLevel < 2 ? 'high' : 'medium',
      }));

    // Create recommendation
    let recommendation = await Recommendation.findOne({
      studentId: req.userId,
      targetCompany,
      targetRole,
    });

    if (recommendation) {
      recommendation = await Recommendation.findByIdAndUpdate(
        recommendation._id,
        {
          skillGaps,
          recommendedLearningPath,
          relatedExperiences: relatedExperiences.map((exp) => exp._id),
          estimatedPreparationDays: Math.ceil(
            recommendedLearningPath.length * 7
          ),
          interviewTips: generateInterviewTips(relatedExperiences),
        },
        { new: true }
      );
    } else {
      recommendation = new Recommendation({
        studentId: req.userId,
        targetCompany,
        targetRole,
        skillGaps,
        recommendedLearningPath,
        relatedExperiences: relatedExperiences.map((exp) => exp._id),
        estimatedPreparationDays: Math.ceil(
          recommendedLearningPath.length * 7
        ),
        interviewTips: generateInterviewTips(relatedExperiences),
      });
      await recommendation.save();
    }

    res.status(201).json({
      message: 'Recommendation generated successfully',
      recommendation,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get my recommendations
exports.getMyRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find({
      studentId: req.userId,
    }).populate('relatedExperiences');

    res.json({
      count: recommendations.length,
      recommendations,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single recommendation
exports.getRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id).populate(
      'relatedExperiences'
    );

    if (!recommendation) {
      return res.status(404).json({ error: 'Recommendation not found' });
    }

    if (recommendation.studentId.toString() !== req.userId) {
      return res.status(403).json({
        error: 'Not authorized to view this recommendation',
      });
    }

    res.json(recommendation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to generate interview tips
function generateInterviewTips(experiences) {
  const tips = [
    'Understand the company culture and values',
    'Practice answering behavioral questions',
    'Prepare for technical coding challenges',
    'Mock interviews before the real one',
  ];

  if (experiences.length > 0) {
    const commonQuestions = experiences
      .flatMap((exp) => exp.questionsAsked || [])
      .slice(0, 3);

    if (commonQuestions.length > 0) {
      tips.push('Common questions to expect:');
      commonQuestions.forEach((q) => {
        if (q.question) tips.push(`  - ${q.question}`);
      });
    }
  }

  return tips;
}

// Delete recommendation
exports.deleteRecommendation = async (req, res) => {
  try {
    const recommendation = await Recommendation.findById(req.params.id);

    if (!recommendation) {
      return res.status(404).json({ error: 'Recommendation not found' });
    }

    if (recommendation.studentId.toString() !== req.userId) {
      return res.status(403).json({
        error: 'Not authorized to delete this recommendation',
      });
    }

    await Recommendation.findByIdAndDelete(req.params.id);

    res.json({ message: 'Recommendation deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
