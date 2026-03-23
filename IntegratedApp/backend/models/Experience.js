const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  company: { type: String, required: [true, 'Company name is required'], trim: true },
  role: { type: String, required: [true, 'Role is required'], trim: true },
  interviewDate: { type: Date, required: true },
  interviewType: { type: String, enum: ['technical', 'hr', 'managerial', 'behavioral', 'case-study'], required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  rounds: [{ roundNumber: Number, roundType: String, description: String, duration: Number }],
  questionsAsked: [{ question: String, category: String }],
  skillsRequired: [String],
  preparationTips: String,
  outcome: { type: String, enum: ['selected', 'rejected', 'pending'], required: true },
  overallExperience: String,
  rating: { type: Number, min: 1, max: 5 },
  createdAt: { type: Date, default: Date.now }
});

experienceSchema.index({ company: 1, role: 1 });
experienceSchema.index({ userId: 1 });

module.exports = mongoose.model('Experience', experienceSchema);
