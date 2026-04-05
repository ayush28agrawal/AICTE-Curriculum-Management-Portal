const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Subject name is required'],
    trim: true,
    validate: [
      {
        validator: function(v) { return !/(.)\1{4,}/.test(v); },
        message: 'Subject name contains too many repeating characters'
      },
      {
        validator: function(v) { return /(?:[a-zA-Z].*){2,}/.test(v); },
        message: 'Subject name must contain at least 2 alphabetical characters'
      }
    ]
  },
  code: {
    type: String,
    required: true,
    trim: true
  },
  credits: {
    type: Number,
    required: true,
    min: 1
  },
  type: {
    type: String,
    enum: ['theory', 'practical', 'elective'],
    default: 'theory'
  },
  learningOutcomes: [{
    type: String,
    trim: true
  }]
});

const semesterSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
    min: 1
  },
  subjects: [subjectSchema],
  totalCredits: {
    type: Number,
    default: 0
  }
});

const curriculumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Curriculum title is required'],
    trim: true,
    minlength: [5, 'Title must be at least 5 characters long'],
    maxlength: [120, 'Title cannot exceed 120 characters'],
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
  programType: {
    type: String,
    enum: ['UG', 'PG', 'Diploma'],
    required: true
  },
  branch: {
    type: String,
    required: [true, 'Branch is required'],
    trim: true,
    minlength: [2, 'Branch name must be at least 2 characters'],
    validate: [
      {
        validator: function(v) { return !/(.)\1{4,}/.test(v); },
        message: 'Branch contains too many repeating characters'
      },
      {
        validator: function(v) { return /(?:[a-zA-Z].*){2,}/.test(v); },
        message: 'Branch must contain at least 2 alphabetical characters'
      }
    ]
  },
  academicYear: {
    type: String,
    required: [true, 'Academic year is required'],
    match: [/^\d{4}-\d{2}$/, 'Academic year must be in format YYYY-YY (e.g., 2023-24)']
  },
  version: {
    type: String,
    required: [true, 'Version is required'],
    default: '1.0'
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft'
  },
  semesters: {
    type: [semesterSchema],
    validate: {
      validator: function(v) {
        if (!v) return true;
        const numbers = v.map(sem => sem.number);
        return new Set(numbers).size === numbers.length;
      },
      message: 'Semester numbers must be unique within a curriculum'
    }
  },
  syllabusFile: {
    filename: String,
    originalName: String,
    path: String,
    uploadedAt: Date
  },
  supportingDocuments: [{
    filename: String,
    originalName: String,
    path: String,
    uploadedAt: Date
  }],
  totalCredits: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true
});

// Calculate total credits before saving
curriculumSchema.pre('save', function() {
  let total = 0;
  this.semesters.forEach(semester => {
    let semTotal = 0;
    semester.subjects.forEach(subject => {
      semTotal += subject.credits;
    });
    semester.totalCredits = semTotal;
    total += semTotal;
  });
  this.totalCredits = total;
});

module.exports = mongoose.model('Curriculum', curriculumSchema);

