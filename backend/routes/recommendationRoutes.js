const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const auth = require('../middleware/auth');

// Protected routes
router.use(auth);

// Recommendations
router.post('/', recommendationController.generateRecommendation);
router.get('/', recommendationController.getMyRecommendations);
router.get('/:id', recommendationController.getRecommendation);
router.delete('/:id', recommendationController.deleteRecommendation);

module.exports = router;
