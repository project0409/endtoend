const express = require('express');
const { body } = require('express-validator');
const {
  createAssessment,
  getUserAssessments,
  getAssessmentById,
  updateAssessment,
  deleteAssessment
} = require('../controllers/assessmentController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, [
  body('targetRole').notEmpty().withMessage('Target role is required'),
  body('currentSkills').isArray().withMessage('Current skills must be an array'),
  body('requiredSkills').isArray().withMessage('Required skills must be an array')
], createAssessment);

router.get('/', protect, getUserAssessments);
router.get('/:id', protect, getAssessmentById);
router.put('/:id', protect, updateAssessment);
router.delete('/:id', protect, deleteAssessment);

module.exports = router;
