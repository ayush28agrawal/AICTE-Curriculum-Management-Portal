const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  curriculum: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curriculum',
    required: true
  },
  institute: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mappingFile: {
    filename: String,
    originalName: String,
    path: String,
    uploadedAt: Date
  },
  feedback: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['submitted', 'under_review', 'approved', 'rejected'],
    default: 'submitted'
  },
  adminFeedback: {
    type: String,
    trim: true
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Ensure one submission per institute per curriculum
submissionSchema.index({ curriculum: 1, institute: 1 }, { unique: true });

module.exports = mongoose.model('Submission', submissionSchema);

