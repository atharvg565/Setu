const express = require('express');
const router = express.Router();
const { submitAssessment, getMyProfile } = require('../controllers/assessmentController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/submit', authMiddleware, submitAssessment);
router.get('/me', authMiddleware, getMyProfile);

module.exports = router;