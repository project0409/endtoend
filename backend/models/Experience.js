const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    jobRole: {
      type: String,
      required: true,
    },
    interviewType: {
      type: String,
      enum: ['technical', 'hr', 'behavioral', 'group-discussion', 'case-study'],
      required: true,
    },
    round: {
      type: Number,
      required: true,
    },
    questionsAsked: [
      {
        question: String,
        topicArea: String,
        difficulty: {
          type: String,
          enum: ['easy', 'medium', 'hard'],
        },
      },
    ],
    skillsRequired: [String],
    preparationTips: String,
    interviewExperience: String,
    result: {
      type: String,
      enum: ['selected', 'rejected', 'hold'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    resourcesUsed: [String],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Experience', experienceSchema);
