const mongoose = require('mongoose');

const postingSchema = new mongoose.Schema({
  industry_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  required_skills: [
    {
      skill_name: { type: String, required: true },
      weight: { 
        type: String, 
        enum: ['low', 'medium', 'high'], 
        required: true 
      }
    }
  ],
  status: { 
    type: String, 
    enum: ['open', 'closed'], 
    default: 'open' 
  }
}, { timestamps: true });

module.exports = mongoose.model('Posting', postingSchema);