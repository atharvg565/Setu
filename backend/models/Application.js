const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  student_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  posting_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posting',
    required: true
  },
  match_score: { type: Number, required: true },
  status: {
    type: String,
    enum: ['applied', 'shortlisted', 'rejected', 'selected'],
    default: 'applied'
  }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);