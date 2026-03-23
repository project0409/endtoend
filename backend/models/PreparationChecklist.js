const mongoose = require('mongoose');

const preparationChecklistSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    topics: [
      {
        name: String,
        description: String,
        resources: [
          {
            title: String,
            link: String,
            type: String,
          },
        ],
        difficulty: {
          type: String,
          enum: ['beginner', 'intermediate', 'advanced'],
        },
      },
    ],
    technicalSkills: [
      {
        skill: String,
        importance: {
          type: String,
          enum: ['must-have', 'good-to-have'],
        },
      },
    ],
    softSkills: [
      {
        skill: String,
        description: String,
      },
    ],
    estimatedPreparationTime: Number,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('PreparationChecklist', preparationChecklistSchema);
