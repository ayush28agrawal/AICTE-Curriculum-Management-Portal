import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  HiOutlineArrowLeft, 
  HiOutlineUpload, 
  HiOutlineDownload, 
  HiOutlinePlus,
  HiOutlineDocumentText,
  HiOutlineCheck
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { curriculumAPI, submissionAPI } from '../../services/api';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Modal, { ConfirmModal } from '../../components/Modal/Modal';
import { PageLoading } from '../../components/Loading/Loading';
import { FormGroup, Input, Select, TextArea, FileInput } from '../../components/Form/Form';
import { formatDate, getStatusClass, getStatusLabel, downloadFile } from '../../utils/helpers';
import './Curriculum.css';

const CurriculumDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin, isInstitute } = useAuth();
  
  const [curriculum, setCurriculum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [modalError, setModalError] = useState('');
  
  // Modals
  const [showSemesterModal, setShowSemesterModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [semesterData, setSemesterData] = useState({ number: '' });
  const [subjectData, setSubjectData] = useState({
    name: '', code: '', credits: '', type: 'theory', learningOutcomes: ''
  });
  const [syllabusFile, setSyllabusFile] = useState(null);
  const [submissionData, setSubmissionData] = useState({ feedback: '' });
  const [mappingFile, setMappingFile] = useState(null);

  useEffect(() => {
    fetchCurriculum();
  }, [id]);

  const fetchCurriculum = async () => {
    try {
      const response = await curriculumAPI.getById(id);
      setCurriculum(response.data.data);
    } catch (error) {
      console.error('Error fetching curriculum:', error);
      navigate('/curriculums');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSemester = async () => {
    setModalError('');
    if (!semesterData.number || parseInt(semesterData.number) <= 0) {
        setModalError('Please enter a valid positive semester number');
        return;
    }
    setActionLoading(true);
    try {
      await curriculumAPI.addSemester(id, { number: parseInt(semesterData.number), subjects: [] });
      await fetchCurriculum();
      setShowSemesterModal(false);
      setSemesterData({ number: '' });
    } catch (error) {
      setModalError(error.response?.data?.message || 'Failed to add semester');
    } finally {
      setActionLoading(false);
    }
  };

  const handleAddSubject = async () => {
    setModalError('');
    if (!subjectData.name || !subjectData.code) {
        setModalError('Subject Name and Code are required');
        return;
    }
    if (/(.)\1{4,}/.test(subjectData.name)) {
        setModalError('Subject Name contains too many repeating characters');
        return;
    }
    if (!/(?:[a-zA-Z].*){2,}/.test(subjectData.name)) {
        setModalError('Subject Name must contain at least 2 alphabetical characters');
        return;
    }
    if (!subjectData.credits || parseInt(subjectData.credits) <= 0) {
        setModalError('Credits must be an integer greater than 0');
        return;
    }
    setActionLoading(true);
    try {
      const outcomes = subjectData.learningOutcomes
        .split('\n')
        .filter(o => o.trim());
      
      await curriculumAPI.addSubject(id, selectedSemester, {
        ...subjectData,
        credits: parseInt(subjectData.credits),
        learningOutcomes: outcomes
      });
      await fetchCurriculum();
      setShowSubjectModal(false);
      setSubjectData({ name: '', code: '', credits: '', type: 'theory', learningOutcomes: '' });
    } catch (error) {
      setModalError(error.response?.data?.message || 'Failed to add subject');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUploadSyllabus = async () => {
    if (!syllabusFile) return;
    setActionLoading(true);
    try {
      const formData = new FormData();
      formData.append('syllabus', syllabusFile);
      await curriculumAPI.uploadSyllabus(id, formData);
      await fetchCurriculum();
      setShowUploadModal(false);
      setSyllabusFile(null);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to upload syllabus');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDownloadSyllabus = async () => {
    try {
      const response = await curriculumAPI.downloadSyllabus(id);
      if (response.data && response.data.url) {
        let downloadLink = response.data.url;
        if (!downloadLink.startsWith('http')) {
           const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
           downloadLink = `${baseUrl}${downloadLink}`;
        }
        window.open(downloadLink, '_blank');
      }
    } catch (error) {
      alert('Failed to download syllabus');
    }
  };

  const handlePublish = async () => {
    setActionLoading(true);
    try {
      await curriculumAPI.publish(id);
      await fetchCurriculum();
      setShowPublishConfirm(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to publish curriculum');
    } finally {
      setActionLoading(false);
    }
  };

  const handleSubmitMapping = async () => {
    setActionLoading(true);
    try {
      const formData = new FormData();
      formData.append('curriculumId', id);
      formData.append('feedback', submissionData.feedback);
      if (mappingFile) {
        formData.append('mappingFile', mappingFile);
      }
      await submissionAPI.create(formData);
      navigate('/my-submissions');
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <PageLoading />;
  if (!curriculum) return null;

  return (
    <div className="curriculum-detail-page">
      <div className="page-header">
        <div className="page-header-content">
          <Button 
            variant="ghost" 
            icon={HiOutlineArrowLeft}
            onClick={() => navigate('/curriculums')}
            className="back-btn"
          >
            Back
          </Button>
          <div className="page-header-title">
            <h1 className="page-title">{curriculum.title}</h1>
            <div className="page-meta">
              <span>{curriculum.programType}</span>
              <span className="meta-dot"></span>
              <span>{curriculum.branch}</span>
              <span className="meta-dot"></span>
              <span>{curriculum.academicYear}</span>
            </div>
          </div>
        </div>
        <span className={`status-badge status-badge-lg ${getStatusClass(curriculum.status)}`}>
          {getStatusLabel(curriculum.status)}
        </span>
      </div>

      {/* Curriculum Info Card */}
      <Card title="Curriculum Information" className="info-card">
        <div className="info-grid">
          <div className="info-item">
            <label>Version</label>
            <span>{curriculum.version}</span>
          </div>
          <div className="info-item">
            <label>Total Credits</label>
            <span>{curriculum.totalCredits}</span>
          </div>
          <div className="info-item">
            <label>Created By</label>
            <span>{curriculum.createdBy?.name}</span>
          </div>
          <div className="info-item">
            <label>Created On</label>
            <span>{formatDate(curriculum.createdAt)}</span>
          </div>
          {curriculum.publishedAt && (
            <div className="info-item">
              <label>Published On</label>
              <span>{formatDate(curriculum.publishedAt)}</span>
            </div>
          )}
        </div>
        {curriculum.description && (
          <div className="description">
            <label>Description</label>
            <p>{curriculum.description}</p>
          </div>
        )}
      </Card>

      {/* Syllabus Section */}
      <Card title="Syllabus Document" className="syllabus-card">
        {curriculum.syllabusFile ? (
          <div className="syllabus-info">
            <div className="file-info">
              <HiOutlineDocumentText className="file-icon" />
              <div className="file-details">
                <span className="file-name">{curriculum.syllabusFile.originalName}</span>
                <span className="file-date">Uploaded {formatDate(curriculum.syllabusFile.uploadedAt)}</span>
              </div>
            </div>
            <Button variant="primary" icon={HiOutlineDownload} onClick={handleDownloadSyllabus}>
              Download
            </Button>
          </div>
        ) : (
          <div className="no-syllabus">
            <HiOutlineDocumentText className="no-syllabus-icon" />
            <p>No syllabus uploaded yet</p>
            {isAdmin() && curriculum.status === 'draft' && (
              <Button variant="outline" icon={HiOutlineUpload} onClick={() => setShowUploadModal(true)}>
                Upload Syllabus
              </Button>
            )}
          </div>
        )}
      </Card>

      {/* Semesters Section */}
      <Card 
        title="Semester Structure"
        subtitle={`${curriculum.semesters.length} semesters, ${curriculum.totalCredits} total credits`}
        actions={
          isAdmin() && curriculum.status === 'draft' && (
            <Button variant="outline" size="small" icon={HiOutlinePlus} onClick={() => setShowSemesterModal(true)}>
              Add Semester
            </Button>
          )
        }
      >
        {curriculum.semesters.length === 0 ? (
          <div className="empty-state">
            <p>No semesters added yet</p>
            {isAdmin() && curriculum.status === 'draft' && (
              <Button variant="outline" icon={HiOutlinePlus} onClick={() => setShowSemesterModal(true)}>
                Add First Semester
              </Button>
            )}
          </div>
        ) : (
          <div className="semesters-list">
            {curriculum.semesters
              .sort((a, b) => a.number - b.number)
              .map((semester, index) => (
              <div key={index} className="semester-card">
                <div className="semester-header">
                  <div className="semester-info">
                    <h4>Semester {semester.number}</h4>
                    <span className="credits-badge">{semester.totalCredits} Credits</span>
                  </div>
                  {isAdmin() && curriculum.status === 'draft' && (
                    <Button 
                      variant="ghost" 
                      size="small"
                      icon={HiOutlinePlus}
                      onClick={() => {
                        setSelectedSemester(index);
                        setShowSubjectModal(true);
                      }}
                    >
                      Add Subject
                    </Button>
                  )}
                </div>
                {semester.subjects.length > 0 ? (
                  <div className="subjects-table-wrapper">
                    <table className="subjects-table">
                      <thead>
                        <tr>
                          <th>Code</th>
                          <th>Subject Name</th>
                          <th>Type</th>
                          <th>Credits</th>
                        </tr>
                      </thead>
                      <tbody>
                        {semester.subjects.map((subject, sIndex) => (
                          <tr key={sIndex}>
                            <td data-label="Code">{subject.code}</td>
                            <td data-label="Subject">
                              <div className="subject-name">{subject.name}</div>
                              {subject.learningOutcomes?.length > 0 && (
                                <div className="learning-outcomes">
                                  {subject.learningOutcomes.slice(0, 2).join(', ')}
                                  {subject.learningOutcomes.length > 2 && '...'}
                                </div>
                              )}
                            </td>
                            <td data-label="Type">
                              <span className={`type-badge type-${subject.type}`}>
                                {subject.type}
                              </span>
                            </td>
                            <td data-label="Credits">{subject.credits}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="no-subjects">No subjects added yet</p>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="page-actions">
        {isAdmin() && curriculum.status === 'draft' && (
          <>
            {!curriculum.syllabusFile && (
              <Button variant="outline" icon={HiOutlineUpload} onClick={() => setShowUploadModal(true)}>
                Upload Syllabus
              </Button>
            )}
            <Button variant="primary" icon={HiOutlineCheck} onClick={() => setShowPublishConfirm(true)}>
              Publish Curriculum
            </Button>
          </>
        )}
        {isInstitute() && curriculum.status === 'published' && (
          <Button variant="primary" icon={HiOutlineUpload} onClick={() => setShowSubmitModal(true)}>
            Submit Adoption Mapping
          </Button>
        )}
      </div>

      {/* Add Semester Modal */}
      <Modal
        isOpen={showSemesterModal}
        onClose={() => {
            setShowSemesterModal(false);
            setModalError('');
        }}
        title="Add Semester"
        size="small"
      >
        {modalError && <div className="form-error-message" style={{marginBottom: '15px'}}>{modalError}</div>}
        <FormGroup label="Semester Number" required>
          <Input
            type="number"
            value={semesterData.number}
            onChange={(e) => setSemesterData({ number: e.target.value })}
            placeholder="e.g., 1"
            min="1"
          />
        </FormGroup>
        <div className="modal-actions">
          <Button variant="secondary" onClick={() => setShowSemesterModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddSemester} loading={actionLoading}>
            Add Semester
          </Button>
        </div>
      </Modal>

      {/* Add Subject Modal */}
      <Modal
        isOpen={showSubjectModal}
        onClose={() => {
            setShowSubjectModal(false);
            setModalError('');
        }}
        title="Add Subject"
        size="medium"
      >
        {modalError && <div className="form-error-message" style={{marginBottom: '15px'}}>{modalError}</div>}
        <FormGroup label="Subject Name" required>
          <Input
            value={subjectData.name}
            onChange={(e) => setSubjectData({ ...subjectData, name: e.target.value })}
            placeholder="e.g., Data Structures"
          />
        </FormGroup>
        <div className="form-row">
          <FormGroup label="Subject Code" required>
            <Input
              value={subjectData.code}
              onChange={(e) => setSubjectData({ ...subjectData, code: e.target.value })}
              placeholder="e.g., CS102"
            />
          </FormGroup>
          <FormGroup label="Credits" required>
            <Input
              type="number"
              value={subjectData.credits}
              onChange={(e) => setSubjectData({ ...subjectData, credits: e.target.value })}
              placeholder="e.g., 4"
              min="1"
            />
          </FormGroup>
        </div>
        <FormGroup label="Type" required>
          <Select
            value={subjectData.type}
            onChange={(e) => setSubjectData({ ...subjectData, type: e.target.value })}
            options={[
              { value: 'theory', label: 'Theory' },
              { value: 'practical', label: 'Practical' },
              { value: 'elective', label: 'Elective' }
            ]}
          />
        </FormGroup>
        <FormGroup label="Learning Outcomes" hint="Enter one outcome per line">
          <TextArea
            value={subjectData.learningOutcomes}
            onChange={(e) => setSubjectData({ ...subjectData, learningOutcomes: e.target.value })}
            placeholder="Enter learning outcomes, one per line"
            rows={4}
          />
        </FormGroup>
        <div className="modal-actions">
          <Button variant="secondary" onClick={() => setShowSubjectModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddSubject} loading={actionLoading}>
            Add Subject
          </Button>
        </div>
      </Modal>

      {/* Upload Syllabus Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        title="Upload Syllabus"
        size="small"
      >
        <FormGroup label="Syllabus PDF" required>
          <FileInput
            accept=".pdf"
            onChange={(e) => setSyllabusFile(e.target.files[0])}
            fileName={syllabusFile?.name}
          />
        </FormGroup>
        <div className="modal-actions">
          <Button variant="secondary" onClick={() => setShowUploadModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleUploadSyllabus} 
            loading={actionLoading}
            disabled={!syllabusFile}
          >
            Upload
          </Button>
        </div>
      </Modal>

      {/* Submit Mapping Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Submit Curriculum Mapping"
        size="medium"
      >
        <FormGroup label="Mapping Document (PDF)">
          <FileInput
            accept=".pdf"
            onChange={(e) => setMappingFile(e.target.files[0])}
            fileName={mappingFile?.name}
          />
        </FormGroup>
        <FormGroup label="Feedback / Comments">
          <TextArea
            value={submissionData.feedback}
            onChange={(e) => setSubmissionData({ ...submissionData, feedback: e.target.value })}
            placeholder="Any feedback or comments about the curriculum adoption"
            rows={4}
          />
        </FormGroup>
        <div className="modal-actions">
          <Button variant="secondary" onClick={() => setShowSubmitModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitMapping} loading={actionLoading}>
            Submit
          </Button>
        </div>
      </Modal>

      {/* Publish Confirm Modal */}
      <ConfirmModal
        isOpen={showPublishConfirm}
        onClose={() => setShowPublishConfirm(false)}
        onConfirm={handlePublish}
        title="Publish Curriculum"
        message="Are you sure you want to publish this curriculum? Once published, it will be visible to all institutes and cannot be edited."
        confirmText="Publish"
        confirmVariant="primary"
        loading={actionLoading}
      />
    </div>
  );
};

export default CurriculumDetail;
