const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['technical', 'behavioral', 'aptitude', 'hr', 'case-study', 'coding', 'system-design'],
    required: true
  },
  type: {
    type: String,
    enum: ['article', 'video', 'course', 'book', 'practice', 'tutorial'],
    required: true
  },
  url: String,
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'intermediate'
  },
  skills: [String],
  companies: [String],
  roles: [String],
  duration: String,
  isPremium: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

resourceSchema.index({ category: 1, difficulty: 1 });
resourceSchema.index({ skills: 1 });

module.exports = mongoose.model('Resource', resourceSchema);
