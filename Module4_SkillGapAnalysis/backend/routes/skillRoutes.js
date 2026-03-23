const express = require('express');
const { body } = require('express-validator');
const {
  createSkillSet,
  getSkillsByRole,
  getAllSkillSets,
  getSkillSetById,
  updateSkillSet,
  deleteSkillSet
} = require('../controllers/skillController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, [
  body('role').notEmpty().withMessage('Role is required'),
  body('skills').isArray().withMessage('Skills must be an array')
], createSkillSet);

router.get('/', getAllSkillSets);
router.get('/by-role', getSkillsByRole);
router.get('/:id', getSkillSetById);
router.put('/:id', protect, updateSkillSet);
router.delete('/:id', protect, deleteSkillSet);

module.exports = router;
