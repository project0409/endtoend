const express = require('express');
const { body } = require('express-validator');
const {
  createResource,
  getAllResources,
  getResourceById,
  getResourcesByRole,
  updateResource,
  deleteResource
} = require('../controllers/resourceController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('category').isIn(['technical', 'behavioral', 'aptitude', 'hr', 'case-study', 'coding', 'system-design']),
  body('type').isIn(['article', 'video', 'course', 'book', 'practice', 'tutorial'])
], createResource);

router.get('/', getAllResources);
router.get('/by-role', getResourcesByRole);
router.get('/:id', getResourceById);
router.put('/:id', protect, updateResource);
router.delete('/:id', protect, deleteResource);

module.exports = router;
