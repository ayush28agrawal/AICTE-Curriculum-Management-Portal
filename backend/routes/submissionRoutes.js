const express = require('express');
const router = express.Router();
const submissionController = require('../controllers/submissionController');
const { protect, authorize } = require('../middleware/auth');
const { uploadSubmission } = require('../middleware/upload');

// Protected routes
router.use(protect);

// Institute routes
router.post('/', authorize('institute'), uploadSubmission.single('mappingFile'), submissionController.create);
router.get('/my-submissions', authorize('institute'), submissionController.getMySubmissions);

// Admin routes
router.get('/', authorize('admin'), submissionController.getAll);
router.get('/stats', authorize('admin'), submissionController.getStats);
router.put('/:id/status', authorize('admin'), submissionController.updateStatus);

// Shared routes
router.get('/:id', submissionController.getById);
router.get('/:id/download', submissionController.downloadFile);

module.exports = router;

