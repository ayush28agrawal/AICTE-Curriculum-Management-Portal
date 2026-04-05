const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['MCQ', 'SHORT', 'LONG', 'CODING'],
    required: true
  },
  marks: {
    type: Number,
    required: true,
    min: 0
  },
  options: [{
    type: String,
    trim: true
  }],
  correctAnswer: {
    type: String,
    trim: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  }
});

const assessmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters long'],
    maxlength: [100, 'Title cannot exceed 100 characters'],
    validate: [
      {
        validator: function(v) {
          return !/(.)\1{4,}/.test(v);
        },
        message: 'Title contains too many repeating characters (e.g. "aaaaa")'
      },
      {
        validator: function(v) {
          return /(?:[a-zA-Z].*){3,}/.test(v);
        },
        message: 'Title must contain at least 3 alphabetical characters'
      }
    ]
  },
  description: {
    type: String,
    trim: true,
    validate: [
      {
        validator: function(v) { return !v || !/(.)\1{4,}/.test(v); },
        message: 'Description contains too many repeating characters'
      },
      {
        validator: function(v) { return !v || /(?:[a-zA-Z].*){3,}/.test(v); },
        message: 'Description must contain at least 3 alphabetical characters if provided'
      }
    ]
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curriculum',
    required: true
  },
  instituteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['Quiz', 'Assignment', 'Midterm', 'End Semester', 'Viva', 'Project'],
    required: true
  },
  totalMarks: {
    type: Number,
    required: [true, 'Total marks are required'],
    min: [1, 'Total marks must be at least 1']
  },
  passingMarks: {
    type: Number,
    required: [true, 'Passing marks are required'],
    min: [0, 'Passing marks cannot be negative'],
    validate: {
      validator: function(value) {
        // `this` refers to the document being validated.
        // Ensure passingMarks <= totalMarks
        if (this.totalMarks === undefined) return true;
        return value <= this.totalMarks;
      },
      message: 'Passing marks cannot be greater than total marks'
    }
  },
  duration: {
    type: Number, // duration in minutes
    min: [1, 'Duration must be at least 1 minute']
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'accepted', 'rejected'],
    default: 'draft'
  },
  fileUrl: {
    type: String
  },
  originalFileName: {
    type: String
  },
  questions: [questionSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Assessment', assessmentSchema);
