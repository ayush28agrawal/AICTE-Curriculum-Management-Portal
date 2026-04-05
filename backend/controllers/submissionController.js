const submissionService = require('../services/submissionService');

// Create submission (Institute)
exports.create = async (req, res) => {
  try {
    const submission = await submissionService.create(
      req.body,
      req.user._id,
      req.file
    );
    res.status(201).json({
      success: true,
      data: submission
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all submissions (Admin)
exports.getAll = async (req, res) => {
  try {
    const submissions = await submissionService.getAll(req.query);
    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get my submissions (Institute)
exports.getMySubmissions = async (req, res) => {
  try {
    const submissions = await submissionService.getByInstitute(req.user._id);
    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get submission by ID
exports.getById = async (req, res) => {
  try {
    const submission = await submissionService.getById(req.params.id);
    
    // Institutes can only view their own submissions
    if (req.user.role === 'institute' && 
        submission.institute._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this submission'
      });
    }

    res.status(200).json({
      success: true,
      data: submission
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Update submission status (Admin)
exports.updateStatus = async (req, res) => {
  try {
    const { status, adminFeedback } = req.body;
    
    if (!['submitted', 'under_review', 'approved', 'rejected'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status'
      });
    }

    const submission = await submissionService.updateStatus(
      req.params.id,
      status,
      adminFeedback,
      req.user._id
    );

    res.status(200).json({
      success: true,
      data: submission
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Download submission file
exports.downloadFile = async (req, res) => {
  try {
    const submission = await submissionService.getById(req.params.id);
    
    if (!submission.mappingFile || !submission.mappingFile.path) {
      return res.status(404).json({
        success: false,
        message: 'File not found'
      });
    }

    let dlUrl = submission.mappingFile.path;
    if (dlUrl.includes('res.cloudinary.com')) {
      dlUrl = dlUrl.replace('/upload/', '/upload/fl_attachment/');
      return res.redirect(dlUrl);
    }
    
    res.download(submission.mappingFile.path, submission.mappingFile.originalName);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Get submission statistics
exports.getStats = async (req, res) => {
  try {
    const stats = await submissionService.getStats();
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

