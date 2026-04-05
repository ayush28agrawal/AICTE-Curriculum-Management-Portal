const express = require('express');
const {
    createAssessment,
    getAllAssessments,
    getAssessmentById,
    updateAssessment,
    deleteAssessment,
    getInstituteAssessments,
    publishAssessment,
    updateAssessmentStatus
} = require('../controllers/assessmentController');

const { protect, authorize } = require('../middleware/auth');
const { uploadAssessment } = require('../middleware/upload');

const router = express.Router();

// Public/Shared routes (requires auth)
router.use(protect);

// Institute routes for their own assessments
// Moved to the top so it doesn't conflict with /:id
router.get('/institute', authorize('institute'), getInstituteAssessments);

// Mixed routes
router.route('/')
    .post(authorize('institute'), uploadAssessment.single('file'), createAssessment)
    .get(authorize('admin'), getAllAssessments);

router.route('/:id')
    .get(authorize('institute', 'admin'), getAssessmentById)
    .put(authorize('institute'), uploadAssessment.single('file'), updateAssessment)
    .delete(authorize('institute', 'admin'), deleteAssessment);

router.route('/:id/publish')
    .patch(authorize('institute'), publishAssessment);

router.route('/:id/status')
    .patch(authorize('admin'), updateAssessmentStatus);

module.exports = router;
