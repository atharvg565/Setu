const mongoose = require('mongoose');

const studentProfileSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true, 
    unique: true 
  },
  skills: [
    {
      skill_name: { type: String, required: true },
      proficiency: { type: Number, min: 0, max: 100, required: true }
    }
  ],
  assessment_history: [
    {
      date: { type: Date, default: Date.now },
      skills_snapshot: [
        {
          skill_name: String,
          proficiency: Number
        }
      ]
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('StudentProfile', studentProfileSchema);