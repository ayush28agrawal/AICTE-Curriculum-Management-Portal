const express = require('express');
const router = express.Router();

const authRoutes = require('./authRoutes');
const curriculumRoutes = require('./curriculumRoutes');
const submissionRoutes = require('./submissionRoutes');
const analyticsRoutes = require('./analyticsRoutes');
const assessmentRoutes = require('./assessmentRoutes');

router.use('/auth', authRoutes);
router.use('/curriculums', curriculumRoutes);
router.use('/submissions', submissionRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/assessments', assessmentRoutes);

module.exports = router;

