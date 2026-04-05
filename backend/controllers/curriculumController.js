const curriculumService = require('../services/curriculumService');
const path = require('path');

// Create curriculum
exports.create = async (req, res) => {
  try {
    const curriculum = await curriculumService.create(req.body, req.user._id);
    res.status(201).json({
      success: true,
      data: curriculum
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get all curriculums
exports.getAll = async (req, res) => {
  try {
    const curriculums = await curriculumService.getAll(req.query, req.user.role);
    res.status(200).json({
      success: true,
      count: curriculums.length,
      data: curriculums
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single curriculum
exports.getById = async (req, res) => {
  try {
    const curriculum = await curriculumService.getById(req.params.id, req.user.role);
    res.status(200).json({
      success: true,
      data: curriculum
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Update curriculum
exports.update = async (req, res) => {
  try {
    const curriculum = await curriculumService.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: curriculum
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Add semester
exports.addSemester = async (req, res) => {
  try {
    const curriculum = await curriculumService.addSemester(req.params.id, req.body);
    res.status(200).json({
      success: true,
      data: curriculum
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Add subject
exports.addSubject = async (req, res) => {
  try {
    const { semesterIndex } = req.params;
    const curriculum = await curriculumService.addSubject(
      req.params.id,
      parseInt(semesterIndex),
      req.body
    );
    res.status(200).json({
      success: true,
      data: curriculum
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Upload syllabus
exports.uploadSyllabus = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a PDF file'
      });
    }

    const curriculum = await curriculumService.uploadSyllabus(req.params.id, req.file);
    res.status(200).json({
      success: true,
      data: curriculum
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Download syllabus
exports.downloadSyllabus = async (req, res) => {
  try {
    const curriculum = await curriculumService.getById(req.params.id, req.user.role);
    
    if (!curriculum.syllabusFile || !curriculum.syllabusFile.path) {
      return res.status(404).json({
        success: false,
        message: 'Syllabus file not found'
      });
    }

    let dlUrl = curriculum.syllabusFile.path;
    if (dlUrl.includes('res.cloudinary.com')) {
      dlUrl = dlUrl.replace('/upload/', '/upload/fl_attachment/');
      return res.redirect(dlUrl);
    }
    
    res.download(curriculum.syllabusFile.path, curriculum.syllabusFile.originalName);
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Publish curriculum
exports.publish = async (req, res) => {
  try {
    const curriculum = await curriculumService.publish(req.params.id);
    res.status(200).json({
      success: true,
      data: curriculum
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Archive curriculum
exports.archive = async (req, res) => {
  try {
    const curriculum = await curriculumService.archive(req.params.id);
    res.status(200).json({
      success: true,
      data: curriculum
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete curriculum
exports.delete = async (req, res) => {
  try {
    const result = await curriculumService.delete(req.params.id);
    res.status(200).json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

