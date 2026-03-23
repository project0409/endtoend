const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const auth = require('../middleware/auth');

// Protected routes
router.use(auth);

// Skill assessments
router.post('/', skillController.createSkillAssessment);
router.get('/', skillController.getMySkillAssessments);
router.get('/gap-analysis', skillController.getSkillGapAnalysis);
router.put('/:id', skillController.updateSkillAssessment);
router.delete('/:id', skillController.deleteSkillAssessment);

module.exports = router;
