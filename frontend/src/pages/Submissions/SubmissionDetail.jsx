import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  HiOutlineArrowLeft, 
  HiOutlineDownload, 
  HiOutlineDocumentText,
  HiOutlineOfficeBuilding,
  HiOutlineBookOpen
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { submissionAPI } from '../../services/api';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Modal from '../../components/Modal/Modal';
import { PageLoading } from '../../components/Loading/Loading';
import { FormGroup, Select, TextArea } from '../../components/Form/Form';
import { formatDate, getStatusClass, getStatusLabel, downloadFile } from '../../utils/helpers';
import './Submissions.css';

const SubmissionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewData, setReviewData] = useState({
    status: '',
    adminFeedback: ''
  });

  useEffect(() => {
    fetchSubmission();
  }, [id]);

  const fetchSubmission = async () => {
    try {
      const response = await submissionAPI.getById(id);
      setSubmission(response.data.data);
    } catch (error) {
      console.error('Error fetching submission:', error);
      navigate(isAdmin() ? '/submissions' : '/my-submissions');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await submissionAPI.downloadFile(id);
      if (response.data && response.data.url) {
        let downloadLink = response.data.url;
        if (!downloadLink.startsWith('http')) {
           const baseUrl = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
           downloadLink = `${baseUrl}${downloadLink}`;
        }
        window.open(downloadLink, '_blank');
      }
    } catch (error) {
      alert('Failed to download file');
    }
  };

  const handleReview = async () => {
    if (!reviewData.status) return;
    setActionLoading(true);
    try {
      await submissionAPI.updateStatus(id, reviewData);
      await fetchSubmission();
      setShowReviewModal(false);
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <PageLoading />;
  if (!submission) return null;

  const backPath = isAdmin() ? '/submissions' : '/my-submissions';

  return (
    <div className="submission-detail-page">
      <div className="page-header">
        <div className="page-header-content">
          <Button 
            variant="ghost" 
            icon={HiOutlineArrowLeft}
            onClick={() => navigate(backPath)}
            className="back-btn"
          >
            Back
          </Button>
          <h1 className="page-title">Submission Details</h1>
          <p className="page-subtitle">{submission.curriculum?.title}</p>
        </div>
        <span className={`status-badge status-badge-lg ${getStatusClass(submission.status)}`}>
          {getStatusLabel(submission.status)}
        </span>
      </div>

      <div className="detail-grid">
        {/* Institute Info */}
        <Card className="detail-card">
          <div className="detail-card-header">
            <HiOutlineOfficeBuilding className="detail-card-icon" />
            <h3>Institute Information</h3>
          </div>
          <div className="info-list">
            <div className="info-row">
              <label>Institute Name</label>
              <span>{submission.institute?.instituteName || submission.institute?.name}</span>
            </div>
            <div className="info-row">
              <label>Email</label>
              <span>{submission.institute?.email}</span>
            </div>
            {submission.institute?.phone && (
              <div className="info-row">
                <label>Phone</label>
                <span>{submission.institute?.phone}</span>
              </div>
            )}
            {submission.institute?.address && (
              <div className="info-row">
                <label>Address</label>
                <span>{submission.institute?.address}</span>
              </div>
            )}
          </div>
        </Card>

        {/* Curriculum Info */}
        <Card className="detail-card">
          <div className="detail-card-header">
            <HiOutlineBookOpen className="detail-card-icon" />
            <h3>Curriculum Information</h3>
          </div>
          <div className="info-list">
            <div className="info-row">
              <label>Title</label>
              <span>{submission.curriculum?.title}</span>
            </div>
            <div className="info-row">
              <label>Program Type</label>
              <span>{submission.curriculum?.programType}</span>
            </div>
            <div className="info-row">
              <label>Branch</label>
              <span>{submission.curriculum?.branch}</span>
            </div>
            <div className="info-row">
              <label>Academic Year</label>
              <span>{submission.curriculum?.academicYear}</span>
            </div>
          </div>
          <Button 
            variant="outline" 
            size="small"
            onClick={() => navigate(`/curriculums/${submission.curriculum?._id}`)}
            className="view-curriculum-btn"
          >
            View Full Curriculum
          </Button>
        </Card>
      </div>

      {/* Submission Details */}
      <Card title="Submission Details" className="submission-card">
        <div className="submission-meta">
          <div className="meta-item">
            <label>Submitted On</label>
            <span>{formatDate(submission.createdAt)}</span>
          </div>
          <div className="meta-item">
            <label>Status</label>
            <span className={`status-badge ${getStatusClass(submission.status)}`}>
              {getStatusLabel(submission.status)}
            </span>
          </div>
          {submission.reviewedAt && (
            <>
              <div className="meta-item">
                <label>Reviewed On</label>
                <span>{formatDate(submission.reviewedAt)}</span>
              </div>
              <div className="meta-item">
                <label>Reviewed By</label>
                <span>{submission.reviewedBy?.name || '-'}</span>
              </div>
            </>
          )}
        </div>

        {submission.feedback && (
          <div className="feedback-section">
            <label>Institute Feedback</label>
            <div className="feedback-content">{submission.feedback}</div>
          </div>
        )}

        {submission.adminFeedback && (
          <div className="feedback-section admin-feedback">
            <label>Admin Feedback</label>
            <div className="feedback-content">{submission.adminFeedback}</div>
          </div>
        )}

        {submission.mappingFile && (
          <div className="file-section">
            <label>Mapping Document</label>
            <div className="file-card">
              <div className="file-info">
                <HiOutlineDocumentText className="file-icon" />
                <div className="file-details">
                  <span className="file-name">{submission.mappingFile.originalName}</span>
                  <span className="file-date">Uploaded {formatDate(submission.mappingFile.uploadedAt)}</span>
                </div>
              </div>
              <Button variant="outline" size="small" icon={HiOutlineDownload} onClick={handleDownload}>
                Download
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Admin Actions */}
      {isAdmin() && ['submitted', 'under_review'].includes(submission.status) && (
        <div className="page-actions">
          <Button variant="primary" onClick={() => setShowReviewModal(true)}>
            Review Submission
          </Button>
        </div>
      )}

      {/* Review Modal */}
      <Modal
        isOpen={showReviewModal}
        onClose={() => setShowReviewModal(false)}
        title="Review Submission"
        size="medium"
      >
        <FormGroup label="Decision" required>
          <Select
            value={reviewData.status}
            onChange={(e) => setReviewData({ ...reviewData, status: e.target.value })}
            options={[
              { value: 'under_review', label: 'Mark as Under Review' },
              { value: 'approved', label: 'Approve' },
              { value: 'rejected', label: 'Reject' }
            ]}
            placeholder="Select decision"
          />
        </FormGroup>
        <FormGroup label="Feedback">
          <TextArea
            value={reviewData.adminFeedback}
            onChange={(e) => setReviewData({ ...reviewData, adminFeedback: e.target.value })}
            placeholder="Provide feedback to the institute"
            rows={4}
          />
        </FormGroup>
        <div className="modal-actions">
          <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleReview} 
            loading={actionLoading}
            disabled={!reviewData.status}
          >
            Submit Review
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default SubmissionDetail;
