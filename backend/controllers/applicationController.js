const Application = require('../models/Application');
const Posting = require('../models/Posting');
const StudentProfile = require('../models/StudentProfile');
const { calculateMatchScore } = require('../utils/matchingEngine');

// STUDENT APPLIES TO A POSTING
exports.applyToPosting = async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({ message: 'Only students can apply' });
    }

    const { posting_id } = req.body;
    if (!posting_id) {
      return res.status(400).json({ message: 'posting_id is required' });
    }

    const posting = await Posting.findById(posting_id);
    if (!posting) {
      return res.status(404).json({ message: 'Posting not found' });
    }

    const alreadyApplied = await Application.findOne({ student_id: req.user.id, posting_id });
    if (alreadyApplied) {
      return res.status(400).json({ message: 'You already applied to this posting' });
    }

    const profile = await StudentProfile.findOne({ user_id: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    const scores = calculateMatchScore(profile.skills, posting.required_skills);

    const application = await Application.create({
      student_id: req.user.id,
      posting_id,
      match_score: scores.final_score,
      status: 'applied'
    });

    res.status(201).json({ message: 'Application submitted', application });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// STUDENT VIEWS THEIR OWN APPLICATIONS
exports.getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ student_id: req.user.id })
      .populate('posting_id', 'title description');
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// INDUSTRY VIEWS RANKED APPLICANTS FOR ONE OF THEIR POSTINGS
exports.getApplicantsForPosting = async (req, res) => {
  try {
    if (req.user.role !== 'industry') {
      return res.status(403).json({ message: 'Only industry accounts can view applicants' });
    }

    const { posting_id } = req.params;

    const posting = await Posting.findById(posting_id);
    if (!posting) {
      return res.status(404).json({ message: 'Posting not found' });
    }
    if (posting.industry_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'This is not your posting' });
    }

    const applications = await Application.find({ posting_id })
      .populate('student_id', 'name email')
      .sort({ match_score: -1 }); // highest score first

    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// INDUSTRY UPDATES APPLICATION STATUS
exports.updateApplicationStatus = async (req, res) => {
  try {
    if (req.user.role !== 'industry') {
      return res.status(403).json({ message: 'Only industry accounts can update status' });
    }

    const { application_id } = req.params;
    const { status } = req.body;

    const validStatuses = ['applied', 'shortlisted', 'rejected', 'selected'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const application = await Application.findById(application_id).populate('posting_id');
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.posting_id.industry_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }

    application.status = status;
    await application.save();

    res.status(200).json({ message: 'Status updated', application });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};