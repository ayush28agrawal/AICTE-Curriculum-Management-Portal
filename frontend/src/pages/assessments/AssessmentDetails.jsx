import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft, HiOutlinePencilAlt, HiOutlineTrash, HiCheck, HiOutlineX, HiOutlineClock, HiOutlineBookOpen, HiOutlineClipboardList, HiOutlineCalendar, HiOutlineStar, HiOutlineDownload } from 'react-icons/hi';
import { assessmentAPI } from '../../services/assessmentAPI';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { PageLoading } from '../../components/Loading/Loading';
import { formatDate } from '../../utils/helpers';
import '../../components/assessment/Assessment.css';
import '../../components/assessment/Assessment.css';

const AssessmentDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAdmin, user } = useAuth();
    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAssessment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const fetchAssessment = async () => {
        try {
            const response = await assessmentAPI.getAssessment(id);
            setAssessment(response.data);
        } catch (err) {
            setError('Failed to load assessment');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this assessment?')) return;

        setActionLoading(true);
        try {
            await assessmentAPI.deleteAssessment(id);
            navigate(isAdmin() ? '/admin/assessments' : '/institute/assessments');
        } catch (err) {
            alert('Failed to delete assessment');
        } finally {
            setActionLoading(false);
        }
    };

    const handlePublish = async () => {
        if (!window.confirm('Publishing will make this assessment active. Continue?')) return;

        setActionLoading(true);
        try {
            await assessmentAPI.publishAssessment(id);
            fetchAssessment(); // Reload data
        } catch (err) {
            alert('Failed to publish assessment');
        } finally {
            setActionLoading(false);
        }
    };

    const handleStatusUpdate = async (newStatus) => {
        if (!window.confirm(`Are you sure you want to mark this assessment as ${newStatus}?`)) return;

        setActionLoading(true);
        try {
            await assessmentAPI.updateStatus(id, { status: newStatus });
            fetchAssessment(); // Reload data
        } catch (err) {
            alert(`Failed to update status`);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDownloadExcel = async () => {
        if (!assessment || !assessment.fileUrl) {
            alert('No file attached to this assessment.');
            return;
        }
        
        try {
            const response = await assessmentAPI.downloadAssessment(id);
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

    if (loading) return <PageLoading />;

    if (error || !assessment) {
        return (
            <div className="error-container">
                <p>{error || 'Assessment not found'}</p>
                <Button onClick={() => navigate(-1)}>Go Back</Button>
            </div>
        );
    }

    const isOwner = user?.role === 'institute' && assessment.instituteId === user?._id;
    const canModify = isAdmin() || isOwner;

    return (
        <div className="assessment-details-premium">
            {/* Hero Header Region */}
            <div className="ad-hero-header">
                <div className="ad-hero-top">
                    <Button
                        variant="ghost"
                        icon={HiOutlineArrowLeft}
                        onClick={() => navigate(-1)}
                        className="ad-back-btn"
                    >
                        Back
                    </Button>
                    <span className={`ad-status-badge status-${assessment.status === 'published' ? 'approved' : assessment.status}`}>
                        {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                    </span>
                </div>

                <h1 className="ad-title">{assessment.title}</h1>
                <p className="ad-subtitle">
                    <HiOutlineBookOpen className="inline-icon" /> Course: <strong>{assessment.courseId?.title}</strong>
                </p>

                {canModify && (
                    <div className="ad-hero-actions">
                        {!isAdmin() && assessment.status === 'draft' && (
                            <Button variant="primary" icon={HiCheck} onClick={handlePublish} loading={actionLoading}>
                                Publish
                            </Button>
                        )}
                        <Button variant="secondary" icon={HiOutlineDownload} onClick={handleDownloadExcel}>
                            Download Excel
                        </Button>
                        {isAdmin() && (
                            <>
                                {assessment.status !== 'accepted' && (
                                    <Button variant="primary" icon={HiCheck} onClick={() => handleStatusUpdate('accepted')} loading={actionLoading}>
                                        Accept
                                    </Button>
                                )}
                                {assessment.status !== 'rejected' && (
                                    <Button variant="secondary" className="ad-btn-danger" icon={HiOutlineX} onClick={() => handleStatusUpdate('rejected')} loading={actionLoading}>
                                        Reject
                                    </Button>
                                )}
                            </>
                        )}
                        {!isAdmin() && (
                            <Button variant="secondary" icon={HiOutlinePencilAlt} onClick={() => navigate(`/institute/assessments/edit/${assessment._id}`)}>
                                Edit
                            </Button>
                        )}
                        <Button variant="secondary" className="ad-btn-danger" icon={HiOutlineTrash} onClick={handleDelete} loading={actionLoading}>
                            Delete
                        </Button>
                    </div>
                )}
            </div>

            <div className="ad-main-content">
                {/* Stats Row */}
                <div className="ad-stats-grid">
                    <div className="ad-stat-card">
                        <div className="ad-stat-icon-wrapper blue"><HiOutlineClipboardList /></div>
                        <div className="ad-stat-text">
                            <span className="ad-stat-label">Type</span>
                            <span className="ad-stat-value">{assessment.type.charAt(0).toUpperCase() + assessment.type.slice(1)}</span>
                        </div>
                    </div>
                    <div className="ad-stat-card">
                        <div className="ad-stat-icon-wrapper purple"><HiOutlineClock /></div>
                        <div className="ad-stat-text">
                            <span className="ad-stat-label">Duration</span>
                            <span className="ad-stat-value">{assessment.duration} Min</span>
                        </div>
                    </div>
                    <div className="ad-stat-card">
                        <div className="ad-stat-icon-wrapper green"><HiOutlineStar /></div>
                        <div className="ad-stat-text">
                            <span className="ad-stat-label">Marks</span>
                            <span className="ad-stat-value">{assessment.totalMarks} <small>(Pass {assessment.passingMarks})</small></span>
                        </div>
                    </div>
                    <div className="ad-stat-card">
                        <div className="ad-stat-icon-wrapper orange"><HiOutlineCalendar /></div>
                        <div className="ad-stat-text">
                            <span className="ad-stat-label">Created</span>
                            <span className="ad-stat-value">{formatDate(assessment.createdAt)}</span>
                        </div>
                    </div>
                </div>

                {assessment.description && (
                    <Card className="ad-description-card">
                        <h3 className="ad-section-title">Instructions & Description</h3>
                        <p className="ad-description-text">{assessment.description}</p>
                    </Card>
                )}

                {assessment.originalFileName && (
                    <Card className="ad-questions-container">
                        <div className="ad-section-title-wrapper" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h3 className="ad-section-title">Assessment Document</h3>
                        </div>

                        <div className="ad-empty-state" style={{ marginTop: '20px', padding: '40px' }}>
                            <div style={{ fontSize: '48px', color: '#6366f1', marginBottom: '10px' }}>
                                <HiOutlineClipboardList />
                            </div>
                            <h3>{assessment.originalFileName}</h3>
                            <p>This assessment is attached as a document.</p>
                            <Button 
                                variant="primary" 
                                icon={HiOutlineDownload} 
                                onClick={handleDownloadExcel}
                                className="mt-4"
                            >
                                Download Document
                            </Button>
                        </div>
                    </Card>
                )}
            </div>
        </div>
    );
};

export default AssessmentDetails;
