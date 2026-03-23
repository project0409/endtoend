const express = require('express');
const { body } = require('express-validator');
const { createExperience, getAllExperiences, getExperienceById, getUserExperiences, updateExperience, deleteExperience } = require('../controllers/experienceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, [
  body('company').notEmpty().withMessage('Company is required'),
  body('role').notEmpty().withMessage('Role is required'),
  body('interviewDate').isISO8601().withMessage('Valid date is required'),
  body('interviewType').isIn(['technical', 'hr', 'managerial', 'behavioral', 'case-study']),
  body('difficulty').isIn(['easy', 'medium', 'hard']),
  body('outcome').isIn(['selected', 'rejected', 'pending'])
], createExperience);

router.get('/', getAllExperiences);
router.get('/my-experiences', protect, getUserExperiences);
router.get('/:id', getExperienceById);
router.put('/:id', protect, updateExperience);
router.delete('/:id', protect, deleteExperience);

module.exports = router;
