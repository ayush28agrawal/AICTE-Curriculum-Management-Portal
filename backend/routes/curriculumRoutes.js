const express = require('express');
const router = express.Router();
const curriculumController = require('../controllers/curriculumController');
const { protect, authorize } = require('../middleware/auth');
const { uploadSyllabus } = require('../middleware/upload');

// Protected routes
router.use(protect);

// Public routes (for authenticated users)
router.get('/', curriculumController.getAll);
router.get('/:id', curriculumController.getById);
router.get('/:id/download', curriculumController.downloadSyllabus);

// Admin only routes
router.post('/', authorize('admin'), curriculumController.create);
router.put('/:id', authorize('admin'), curriculumController.update);
router.post('/:id/semesters', authorize('admin'), curriculumController.addSemester);
router.post('/:id/semesters/:semesterIndex/subjects', authorize('admin'), curriculumController.addSubject);
router.post('/:id/upload-syllabus', authorize('admin'), uploadSyllabus.single('syllabus'), curriculumController.uploadSyllabus);
router.post('/:id/publish', authorize('admin'), curriculumController.publish);
router.post('/:id/archive', authorize('admin'), curriculumController.archive);
router.delete('/:id', authorize('admin'), curriculumController.delete);

module.exports = router;

