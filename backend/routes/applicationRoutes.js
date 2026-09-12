const express = require('express');
const router = express.Router();
const {
  applyToPosting,
  getMyApplications,
  getApplicantsForPosting,
  updateApplicationStatus
} = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/apply', authMiddleware, applyToPosting);
router.get('/mine', authMiddleware, getMyApplications);
router.get('/posting/:posting_id', authMiddleware, getApplicantsForPosting);
router.patch('/:application_id/status', authMiddleware, updateApplicationStatus);

module.exports = router;