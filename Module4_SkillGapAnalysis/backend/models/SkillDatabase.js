const mongoose = require('mongoose');

const skillDatabaseSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true
  },
  company: String,
  category: {
    type: String,
    enum: ['technical', 'soft-skills', 'tools', 'frameworks', 'languages', 'concepts']
  },
  skills: [{
    name: String,
    importance: {
      type: String,
      enum: ['must-have', 'good-to-have', 'optional']
    },
    proficiencyLevel: String,
    description: String
  }],
  experienceLevel: {
    type: String,
    enum: ['entry', 'mid', 'senior']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

skillDatabaseSchema.index({ role: 1, company: 1 });

module.exports = mongoose.model('SkillDatabase', skillDatabaseSchema);
