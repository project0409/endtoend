const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['graduate', 'employee'], required: true },
  profile: {
    university: String,
    degree: String,
    graduationYear: Number,
    company: String,
    position: String,
    experience: Number,
    skills: [String]
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
