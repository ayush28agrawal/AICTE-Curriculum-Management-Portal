const Curriculum = require('../models/Curriculum');

class CurriculumService {
  // Create new curriculum (draft)
  async create(data, userId) {
    const curriculum = await Curriculum.create({
      ...data,
      createdBy: userId,
      status: 'draft'
    });
    return curriculum;
  }

  // Get all curriculums (with filters)
  async getAll(filters = {}, userRole) {
    let query = {};
    
    // Institutes can only see published curriculums
    if (userRole === 'institute') {
      query.status = 'published';
    }

    if (filters.status && userRole === 'admin') {
      query.status = filters.status;
    }

    if (filters.programType) {
      query.programType = filters.programType;
    }

    if (filters.branch) {
      query.branch = { $regex: filters.branch, $options: 'i' };
    }

    if (filters.academicYear) {
      query.academicYear = filters.academicYear;
    }

    const curriculums = await Curriculum.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });

    return curriculums;
  }

  // Get curriculum by ID
  async getById(id, userRole) {
    const curriculum = await Curriculum.findById(id)
      .populate('createdBy', 'name email');

    if (!curriculum) {
      throw new Error('Curriculum not found');
    }

    // Institutes can only view published curriculums
    if (userRole === 'institute' && curriculum.status !== 'published') {
      throw new Error('Curriculum not available');
    }

    return curriculum;
  }

  // Update curriculum
  async update(id, data) {
    const curriculum = await Curriculum.findById(id);
    
    if (!curriculum) {
      throw new Error('Curriculum not found');
    }

    if (curriculum.status === 'published') {
      throw new Error('Cannot edit published curriculum');
    }

    Object.assign(curriculum, data);
    await curriculum.save();

    return curriculum;
  }

  // Add semester to curriculum
  async addSemester(curriculumId, semesterData) {
    const curriculum = await Curriculum.findById(curriculumId);
    
    if (!curriculum) {
      throw new Error('Curriculum not found');
    }

    if (curriculum.status === 'published') {
      throw new Error('Cannot modify published curriculum');
    }

    curriculum.semesters.push(semesterData);
    await curriculum.save();

    return curriculum;
  }

  // Add subject to semester
  async addSubject(curriculumId, semesterIndex, subjectData) {
    const curriculum = await Curriculum.findById(curriculumId);
    
    if (!curriculum) {
      throw new Error('Curriculum not found');
    }

    if (!curriculum.semesters[semesterIndex]) {
      throw new Error('Semester not found');
    }

    curriculum.semesters[semesterIndex].subjects.push(subjectData);
    await curriculum.save();

    return curriculum;
  }

  // Upload syllabus
  async uploadSyllabus(curriculumId, fileData) {
    const curriculum = await Curriculum.findById(curriculumId);
    
    if (!curriculum) {
      throw new Error('Curriculum not found');
    }

    curriculum.syllabusFile = {
      filename: fileData.filename,
      originalName: fileData.originalname,
      path: fileData.path,
      uploadedAt: new Date()
    };

    await curriculum.save();
    return curriculum;
  }

  // Publish curriculum
  async publish(id) {
    const curriculum = await Curriculum.findById(id);
    
    if (!curriculum) {
      throw new Error('Curriculum not found');
    }

    // Validate curriculum completeness
    if (curriculum.semesters.length === 0) {
      throw new Error('Curriculum must have at least one semester');
    }

    const hasSubjects = curriculum.semesters.every(sem => sem.subjects.length > 0);
    if (!hasSubjects) {
      throw new Error('All semesters must have at least one subject');
    }

    curriculum.status = 'published';
    curriculum.publishedAt = new Date();
    await curriculum.save();

    return curriculum;
  }

  // Archive curriculum
  async archive(id) {
    const curriculum = await Curriculum.findByIdAndUpdate(
      id,
      { status: 'archived' },
      { new: true }
    );

    if (!curriculum) {
      throw new Error('Curriculum not found');
    }

    return curriculum;
  }

  // Delete curriculum (draft only)
  async delete(id) {
    const curriculum = await Curriculum.findById(id);
    
    if (!curriculum) {
      throw new Error('Curriculum not found');
    }

    if (curriculum.status !== 'draft') {
      throw new Error('Only draft curriculums can be deleted');
    }

    await curriculum.deleteOne();
    return { message: 'Curriculum deleted successfully' };
  }
}

module.exports = new CurriculumService();

