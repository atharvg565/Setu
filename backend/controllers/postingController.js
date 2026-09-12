const Posting = require('../models/Posting');
const StudentProfile = require('../models/StudentProfile');
const { calculateMatchScore } = require('../utils/matchingEngine');

// CREATE A POSTING (industry only)
exports.createPosting = async (req, res) => {
  try {
    if (req.user.role !== 'industry') {
      return res.status(403).json({ message: 'Only industry accounts can create postings' });
    }

    const { title, description, required_skills } = req.body;

    if (!title || !description || !required_skills || required_skills.length === 0) {
      return res.status(400).json({ message: 'Title, description, and required skills are required' });
    }

    const posting = await Posting.create({
      industry_id: req.user.id,
      title,
      description,
      required_skills
    });

    res.status(201).json({ message: 'Posting created', posting });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET ALL OPEN POSTINGS (students browse these)
exports.getAllPostings = async (req, res) => {
  try {
    const postings = await Posting.find({ status: 'open' }).populate('industry_id', 'name email');
    res.status(200).json(postings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET POSTINGS CREATED BY THE LOGGED-IN INDUSTRY USER
exports.getMyPostings = async (req, res) => {
  try {
    if (req.user.role !== 'industry') {
      return res.status(403).json({ message: 'Only industry accounts can view this' });
    }

    const postings = await Posting.find({ industry_id: req.user.id });
    res.status(200).json(postings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET RANKED MATCHES FOR THE LOGGED-IN STUDENT
exports.getMatches = async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can view matches' });
    }

    const profile = await StudentProfile.findOne({ user_id: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    const openPostings = await Posting.find({ status: 'open' }).populate('industry_id', 'name email');

    const rankedMatches = openPostings.map(posting => {
      const scores = calculateMatchScore(profile.skills, posting.required_skills);
      return {
        posting_id: posting._id,
        title: posting.title,
        description: posting.description,
        industry: posting.industry_id,
        required_skills: posting.required_skills,
        ...scores
      };
    });

    // sort highest final_score first
    rankedMatches.sort((a, b) => b.final_score - a.final_score);

    res.status(200).json(rankedMatches);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};