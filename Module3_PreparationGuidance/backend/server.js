const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const resourceRoutes = require('./routes/resourceRoutes');
const checklistRoutes = require('./routes/checklistRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.use('/api/resources', resourceRoutes);
app.use('/api/checklists', checklistRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', module: 'Preparation Guidance' });
});

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Preparation Guidance Module running on port ${PORT}`);
});
