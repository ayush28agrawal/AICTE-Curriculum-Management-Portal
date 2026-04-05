const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const config = require('../config/config');

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET
});

// Storage for syllabus files (PDFs)
const syllabusStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'aicte/syllabi',
    format: async (req, file) => 'pdf',
    resource_type: 'raw', // PDFs are treated as raw files in Cloudinary if we want to keep them intact
    public_id: (req, file) => 'syllabus-' + Date.now() + '-' + Math.round(Math.random() * 1E9),
  },
});

// Storage for submission files (Mostly Excels)
const submissionStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'aicte/submissions',
    resource_type: 'raw', // Excel sheets and CSVs are raw files
    public_id: (req, file) => 'submission-' + Date.now() + '-' + Math.round(Math.random() * 1E9),
  },
});

// Storage for assessment files (Excels)
const assessmentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'aicte/assessments',
    resource_type: 'raw',
    public_id: (req, file) => 'assessment-' + Date.now() + '-' + Math.round(Math.random() * 1E9),
  },
});

// File filter - only allow PDFs for Syllabus
const pdfFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'), false);
  }
};

// Export multer instances
exports.uploadSyllabus = multer({
  storage: syllabusStorage,
  fileFilter: pdfFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

exports.uploadSubmission = multer({
  storage: submissionStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

exports.uploadAssessment = multer({
  storage: assessmentStorage,
  limits: { fileSize: 20 * 1024 * 1024 } // 20MB limit
});
