const express = require('express');
const router = express.Router();
const experienceController = require('../controllers/experienceController');
const auth = require('../middleware/auth');

// Get companies and roles
router.get('/companies', experienceController.getCompanies);
router.get('/companies/:company/roles', experienceController.getJobRolesByCompany);

// Get experiences by company and role
router.get('/', experienceController.getExperiencesByCompanyRole);

// Get single experience
router.get('/:id', experienceController.getExperience);

// Protect routes below
router.use(auth);

// Employee only - share experience
router.post('/', experienceController.shareExperience);

// Get my experiences
router.get('/my/all', experienceController.getMyExperiences);

// Update and delete
router.put('/:id', experienceController.updateExperience);
router.delete('/:id', experienceController.deleteExperience);

module.exports = router;
