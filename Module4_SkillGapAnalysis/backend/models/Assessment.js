const mongoose = require('mongoose');

const assessmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  targetRole: {
    type: String,
    required: true
  },
  targetCompany: String,
  currentSkills: [{
    skill: String,
    proficiency: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert']
    }
  }],
  requiredSkills: [{
    skill: String,
    importance: {
      type: String,
      enum: ['must-have', 'good-to-have', 'optional']
    },
    proficiency: String
  }],
  skillGaps: [{
    skill: String,
    currentLevel: String,
    requiredLevel: String,
    priority: {
      type: String,
      enum: ['high', 'medium', 'low']
    },
    recommendations: [String]
  }],
  overallScore: {
    type: Number,
    min: 0,
    max: 100
  },
  readinessLevel: {
    type: String,
    enum: ['not-ready', 'needs-improvement', 'ready', 'well-prepared']
  },
  learningPath: [{
    skill: String,
    resources: [String],
    estimatedTime: String,
    order: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

assessmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Assessment', assessmentSchema);
