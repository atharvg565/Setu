const StudentProfile = require('../models/StudentProfile');

// SUBMIT / UPDATE SKILL ASSESSMENT
exports.submitAssessment = async (req, res) => {
  try {
    const userId = req.user.id; // comes from auth middleware
    const { skills } = req.body; // [{ skill_name, proficiency }]

    if (!skills || !Array.isArray(skills) || skills.length === 0) {
      return res.status(400).json({ message: 'Skills array is required' });
    }

    let profile = await StudentProfile.findOne({ user_id: userId });

    if (!profile) {
      profile = await StudentProfile.create({ user_id: userId, skills: [] });
    }

    // save a snapshot of the old skills into history before overwriting
    if (profile.skills.length > 0) {
      profile.assessment_history.push({
        date: new Date(),
        skills_snapshot: profile.skills
      });
    }

    profile.skills = skills;
    await profile.save();

    res.status(200).json({ message: 'Assessment saved', profile });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// GET MY PROFILE (skills + gaps)
exports.getMyProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await StudentProfile.findOne({ user_id: userId }).populate('user_id', 'name email');

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};