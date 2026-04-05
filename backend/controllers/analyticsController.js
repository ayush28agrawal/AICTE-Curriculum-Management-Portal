const analyticsService = require('../services/analyticsService');

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
  try {
    const stats = await analyticsService.getDashboardStats();
    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get curriculum adoption stats
exports.getCurriculumAdoption = async (req, res) => {
  try {
    const adoption = await analyticsService.getCurriculumAdoption();
    res.status(200).json({
      success: true,
      data: adoption
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get recent activity
exports.getRecentActivity = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const activity = await analyticsService.getRecentActivity(limit);
    res.status(200).json({
      success: true,
      data: activity
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

