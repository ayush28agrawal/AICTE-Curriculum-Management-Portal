const Curriculum = require('../models/Curriculum');
const Submission = require('../models/Submission');
const User = require('../models/User');

class AnalyticsService {
  // Get dashboard statistics
  async getDashboardStats() {
    const [
      totalCurriculums,
      publishedCurriculums,
      draftCurriculums,
      totalInstitutes,
      totalAdmins,
      submissionStats
    ] = await Promise.all([
      Curriculum.countDocuments(),
      Curriculum.countDocuments({ status: 'published' }),
      Curriculum.countDocuments({ status: 'draft' }),
      User.countDocuments({ role: 'institute', isActive: true }),
      User.countDocuments({ role: 'admin', isActive: true }),
      Submission.aggregate([
        {
          $group: {
            _id: '$status',
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    const submissions = {
      submitted: 0,
      under_review: 0,
      approved: 0,
      rejected: 0,
      total: 0
    };

    submissionStats.forEach(s => {
      submissions[s._id] = s.count;
      submissions.total += s.count;
    });

    return {
      curriculums: {
        total: totalCurriculums,
        published: publishedCurriculums,
        draft: draftCurriculums
      },
      users: {
        institutes: totalInstitutes,
        admins: totalAdmins
      },
      submissions,
      adoptionRate: totalInstitutes > 0 
        ? ((submissions.approved / totalInstitutes) * 100).toFixed(1) 
        : 0
    };
  }

  // Get curriculum-wise adoption stats
  async getCurriculumAdoption() {
    const adoption = await Submission.aggregate([
      {
        $match: { status: 'approved' }
      },
      {
        $group: {
          _id: '$curriculum',
          adoptedCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'curriculums',
          localField: '_id',
          foreignField: '_id',
          as: 'curriculum'
        }
      },
      {
        $unwind: '$curriculum'
      },
      {
        $project: {
          title: '$curriculum.title',
          programType: '$curriculum.programType',
          branch: '$curriculum.branch',
          adoptedCount: 1
        }
      },
      {
        $sort: { adoptedCount: -1 }
      }
    ]);

    return adoption;
  }

  // Get recent activity
  async getRecentActivity(limit = 10) {
    const [recentSubmissions, recentCurriculums] = await Promise.all([
      Submission.find()
        .populate('curriculum', 'title')
        .populate('institute', 'instituteName')
        .sort({ createdAt: -1 })
        .limit(limit),
      Curriculum.find()
        .populate('createdBy', 'name')
        .sort({ createdAt: -1 })
        .limit(limit)
    ]);

    return {
      submissions: recentSubmissions,
      curriculums: recentCurriculums
    };
  }
}

module.exports = new AnalyticsService();

