const mongoose = require('mongoose');

const skillAssessmentSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    skill: {
      type: String,
      required: true,
    },
    selfRating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    assessmentScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    feedback: String,
    resourcesRecommended: [String],
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed'],
      default: 'not-started',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SkillAssessment', skillAssessmentSchema);
