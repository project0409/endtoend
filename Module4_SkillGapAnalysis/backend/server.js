const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const assessmentRoutes = require('./routes/assessmentRoutes');
const skillRoutes = require('./routes/skillRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.use('/api/assessments', assessmentRoutes);
app.use('/api/skills', skillRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', module: 'Skill Gap Analysis' });
});

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Skill Gap Analysis Module running on port ${PORT}`);
});
