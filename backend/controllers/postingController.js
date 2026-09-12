const Posting = require('../models/Posting');

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