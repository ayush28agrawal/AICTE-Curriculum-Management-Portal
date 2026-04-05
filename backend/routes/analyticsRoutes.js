const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { protect, authorize } = require('../middleware/auth');

// All analytics routes are admin only
router.use(protect);
router.use(authorize('admin'));

router.get('/dashboard', analyticsController.getDashboardStats);
router.get('/adoption', analyticsController.getCurriculumAdoption);
router.get('/activity', analyticsController.getRecentActivity);

module.exports = router;

