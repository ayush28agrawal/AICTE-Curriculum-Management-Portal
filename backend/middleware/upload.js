const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const config = require('../config/config');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET
});

// Helper for safe extension extraction
const safeExt = (file) => {
  if (!file || !file.originalname) return '';
  const ext = path.extname(file.originalname);
  return ext ? ext.toLowerCase() : '';
};

// Storage for syllabus files (PDFs)
const syllabusStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'aicte/syllabi',
    resource_type: 'raw', 
    public_id: (req, file) => 'syllabus-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + safeExt(file),
  },
});

// Storage for submission files (Mostly Excels)
const submissionStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'aicte/submissions',
    resource_type: 'raw', 
    public_id: (req, file) => 'submission-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + safeExt(file),
  },
});

// Storage for assessment files (Excels)
const assessmentStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'aicte/assessments',
    resource_type: 'raw',
    public_id: (req, file) => 'assessment-' + Date.now() + '-' + Math.round(Math.random() * 1E9) + safeExt(file),
  },
});

// File filter - only allow PDFs for Syllabus
const pdfFilter = (req, file, cb) => {
  const ext = safeExt(file);
  if (file.mimetype === 'application/pdf' || ext === '.pdf') {
    cb(null, true);
  } else {
    const err = new multer.MulterError('LIMIT_UNEXPECTED_FILE', file.fieldname);
    err.message = 'Only PDF files are allowed!';
    cb(err, false);
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
