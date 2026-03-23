const express = require('express');
const router = express.Router();
const guidanceController = require('../controllers/guidanceController');
const auth = require('../middleware/auth');

// Public routes
router.get('/', guidanceController.getPreparationGuidance);
router.get('/all', guidanceController.getAllGuidelines);

// Protected routes
router.post('/', auth, guidanceController.createGuidance);
router.put('/:id', auth, guidanceController.updateGuidance);

module.exports = router;
