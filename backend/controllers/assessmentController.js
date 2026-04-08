const Assessment = require('../models/Assessment');

// @desc    Create new assessment
// @route   POST /api/assessments
// @access  Private (Institute)
exports.createAssessment = async (req, res) => {
    try {
        const { title, description, courseId, type, passingMarks, duration, totalMarks } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: 'Title is required'
            });
        }

        let fileUrl = '';
        let originalFileName = '';
        if (req.file) {
            fileUrl = req.file.path;
            originalFileName = req.file.originalname;
        }

        const assessment = await Assessment.create({
            title,
            description,
            courseId,
            instituteId: req.user._id,
            type,
            totalMarks: totalMarks || 0,
            passingMarks: passingMarks || 0,
            duration,
            status: 'draft',
            fileUrl,
            originalFileName
        });

        res.status(201).json({
            success: true,
            data: assessment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Error creating assessment'
        });
    }
};

// @desc    Get all assessments (Admin)
// @route   GET /api/assessments
// @access  Private (Admin)
exports.getAllAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.find({})
            .populate('instituteId', 'name email address userType')
            .populate('courseId', 'title code')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: assessments.length,
            data: assessments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Get assessment by ID
// @route   GET /api/assessments/:id
// @access  Private (Admin, Institute)
exports.getAssessmentById = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id)
            .populate('courseId', 'title code');

        if (!assessment) {
            return res.status(404).json({
                success: false,
                message: 'Assessment not found'
            });
        }

        // Checking authorization
        if (req.user.role === 'institute' && assessment.instituteId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to access this assessment'
            });
        }

        res.status(200).json({
            success: true,
            data: assessment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Update assessment
// @route   PUT /api/assessments/:id
// @access  Private (Institute)
exports.updateAssessment = async (req, res) => {
    try {
        let assessment = await Assessment.findById(req.params.id);

        if (!assessment) {
            return res.status(404).json({
                success: false,
                message: 'Assessment not found'
            });
        }

        if (assessment.instituteId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this assessment'
            });
        }

        // Update file info if a new file is uploaded
        if (req.file) {
            req.body.fileUrl = req.file.path;
            req.body.originalFileName = req.file.originalname;
        }

        // Only allow updating drafts or published (before approval)
        // If it was rejected or accepted, editing resets it to draft for review
        if (assessment.status === 'rejected' || assessment.status === 'accepted') {
            req.body.status = 'draft';
        }

        const updatedAssessment = await Assessment.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            success: true,
            data: updatedAssessment
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message || 'Error updating assessment'
        });
    }
};

// @desc    Delete assessment
// @route   DELETE /api/assessments/:id
// @access  Private (Institute, Admin)
exports.deleteAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);

        if (!assessment) {
            return res.status(404).json({
                success: false,
                message: 'Assessment not found'
            });
        }

        if (req.user.role === 'institute' && assessment.instituteId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this assessment'
            });
        }

        await assessment.deleteOne();

        res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Get institute's assessments
// @route   GET /api/institute/assessments
// @access  Private (Institute)
exports.getInstituteAssessments = async (req, res) => {
    try {
        const assessments = await Assessment.find({ instituteId: req.user._id })
            .populate('courseId', 'title code')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: assessments.length,
            data: assessments
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Publish assessment
// @route   PATCH /api/assessments/:id/publish
// @access  Private (Institute)
exports.publishAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);

        if (!assessment) {
            return res.status(404).json({
                success: false,
                message: 'Assessment not found'
            });
        }

        if (assessment.instituteId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to publish this assessment'
            });
        }

        assessment.status = 'published';
        await assessment.save();

        res.status(200).json({
            success: true,
            data: assessment
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// @desc    Update assessment status
// @route   PATCH /api/assessments/:id/status
// @access  Private (Admin)
exports.updateAssessmentStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['published', 'accepted', 'rejected'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ message: 'Invalid status value' });
        }

        const assessment = await Assessment.findById(req.params.id);

        if (!assessment) {
            return res.status(404).json({ message: 'Assessment not found' });
        }

        assessment.status = status;
        const updatedAssessment = await assessment.save();

        res.json({
            message: `Assessment status updated to ${status}`,
            assessment: updatedAssessment
        });

    } catch (error) {
        console.error('Error in updateAssessmentStatus:', error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Download assessment file
// @route   GET /api/assessments/:id/download
// @access  Private (Institute, Admin)
exports.downloadAssessment = async (req, res) => {
    try {
        const assessment = await Assessment.findById(req.params.id);
        
        if (!assessment || !assessment.fileUrl) {
            return res.status(404).json({ success: false, message: 'File not found' });
        }
        
        // Checking authorization
        if (req.user.role === 'institute' && assessment.instituteId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ success: false, message: 'Not authorized to download this' });
        }
        
        let dlUrl = assessment.fileUrl;
        if (dlUrl.includes('res.cloudinary.com')) {
            const cloudinary = require('cloudinary').v2;
            const publicIdMatch = dlUrl.match(/v\d+\/(.+)$/);
            if (publicIdMatch) {
               const signedUrl = cloudinary.utils.private_download_url(publicIdMatch[1], '', {
                  resource_type: 'raw', type: 'upload', attachment: true
               });
               return res.status(200).json({ success: true, url: signedUrl });
            }
        }
        return res.status(200).json({ success: true, url: `/uploads/${dlUrl.split('uploads/').pop() || dlUrl}` });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
