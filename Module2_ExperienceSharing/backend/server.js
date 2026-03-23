const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const experienceRoutes = require('./routes/experienceRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

app.use('/api/experiences', experienceRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', module: 'Experience Sharing' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Experience Sharing Module running on port ${PORT}`);
});
