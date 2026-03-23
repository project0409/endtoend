const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const experienceRoutes = require('./routes/experienceRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const checklistRoutes = require('./routes/checklistRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const skillRoutes = require('./routes/skillRoutes');

const app = express();

app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/experiences', experienceRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/checklists', checklistRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/skills', skillRoutes);

app.get('/health', (req, res) => res.json({ status: 'OK', app: 'Interview Prep Platform' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
