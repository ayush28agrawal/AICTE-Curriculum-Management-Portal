const Submission = require('../models/Submission');
const Curriculum = require('../models/Curriculum');

class SubmissionService {
  // Create submission (Institute submits their mapping)
  async create(data, instituteId, fileData) {
    // Check if curriculum exists and is published
    const curriculum = await Curriculum.findById(data.curriculumId);
    if (!curriculum || curriculum.status !== 'published') {
      throw new Error('Curriculum not available for submission');
    }

    // Check if already submitted
    const existing = await Submission.findOne({
      curriculum: data.curriculumId,
      institute: instituteId
    });

    if (existing) {
      throw new Error('You have already submitted for this curriculum');
    }

    const submission = await Submission.create({
      curriculum: data.curriculumId,
      institute: instituteId,
      feedback: data.feedback,
      mappingFile: fileData ? {
        filename: fileData.filename,
        originalName: fileData.originalname,
        path: fileData.path,
        uploadedAt: new Date()
      } : null,
      status: 'submitted'
    });

    return submission.populate(['curriculum', 'institute']);
  }

  // Get all submissions (Admin view)
  async getAll(filters = {}) {
    let query = {};

    if (filters.status) {
      query.status = filters.status;
    }

    if (filters.curriculum) {
      query.curriculum = filters.curriculum;
    }

    const submissions = await Submission.find(query)
      .populate('curriculum', 'title programType branch academicYear')
      .populate('institute', 'name instituteName email')
      .sort({ createdAt: -1 });

    return submissions;
  }

  // Get submissions by institute
  async getByInstitute(instituteId) {
    const submissions = await Submission.find({ institute: instituteId })
      .populate('curriculum', 'title programType branch academicYear status')
      .populate('reviewedBy', 'name')
      .sort({ createdAt: -1 });

    return submissions;
  }

  // Get submission by ID
  async getById(id) {
    const submission = await Submission.findById(id)
      .populate('curriculum')
      .populate('institute', 'name instituteName email phone address')
      .populate('reviewedBy', 'name');

    if (!submission) {
      throw new Error('Submission not found');
    }

    return submission;
  }

  // Update submission status (Admin)
  async updateStatus(id, status, adminFeedback, adminId) {
    const submission = await Submission.findById(id);

    if (!submission) {
      throw new Error('Submission not found');
    }

    submission.status = status;
    submission.adminFeedback = adminFeedback;
    submission.reviewedBy = adminId;
    submission.reviewedAt = new Date();

    await submission.save();

    return submission.populate(['curriculum', 'institute', 'reviewedBy']);
  }

  // Get submission statistics
  async getStats() {
    const stats = await Submission.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const result = {
      submitted: 0,
      under_review: 0,
      approved: 0,
      rejected: 0,
      total: 0
    };

    stats.forEach(s => {
      result[s._id] = s.count;
      result.total += s.count;
    });

    return result;
  }
}

module.exports = new SubmissionService();

