const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    targetCompany: String,
    targetRole: String,
    skillGaps: [
      {
        skill: String,
        currentLevel: Number,
        targetLevel: Number,
      },
    ],
    recommendedLearningPath: [
      {
        step: Number,
        topic: String,
        duration: String,
        resources: [String],
        priority: {
          type: String,
          enum: ['high', 'medium', 'low'],
        },
      },
    ],
    interviewTips: [String],
    relatedExperiences: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Experience',
      },
    ],
    estimatedPreparationDays: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recommendation', recommendationSchema);
