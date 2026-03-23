const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  company: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  targetDate: Date,
  items: [{
    title: String,
    description: String,
    category: String,
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: Date
  }],
  progress: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

checklistSchema.pre('save', function(next) {
  if (this.items && this.items.length > 0) {
    const completed = this.items.filter(item => item.completed).length;
    this.progress = Math.round((completed / this.items.length) * 100);
  }
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Checklist', checklistSchema);
