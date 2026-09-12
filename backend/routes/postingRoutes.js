const express = require('express');
const router = express.Router();
const { createPosting, getAllPostings, getMyPostings, getMatches } = require('../controllers/postingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/create', authMiddleware, createPosting);
router.get('/all', authMiddleware, getAllPostings);
router.get('/mine', authMiddleware, getMyPostings);
router.get('/matches', authMiddleware, getMatches);

module.exports = router;