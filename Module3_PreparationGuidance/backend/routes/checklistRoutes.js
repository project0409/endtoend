const express = require('express');
const { body } = require('express-validator');
const {
  createChecklist,
  getUserChecklists,
  getChecklistById,
  updateChecklist,
  toggleChecklistItem,
  deleteChecklist
} = require('../controllers/checklistController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, [
  body('company').notEmpty().withMessage('Company is required'),
  body('role').notEmpty().withMessage('Role is required')
], createChecklist);

router.get('/', protect, getUserChecklists);
router.get('/:id', protect, getChecklistById);
router.put('/:id', protect, updateChecklist);
router.post('/:id/toggle', protect, toggleChecklistItem);
router.delete('/:id', protect, deleteChecklist);

module.exports = router;
