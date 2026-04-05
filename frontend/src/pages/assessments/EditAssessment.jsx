import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { assessmentAPI } from '../../services/assessmentAPI';
import Button from '../../components/Button/Button';
import AssessmentForm from '../../components/assessment/AssessmentForm';
import { PageLoading } from '../../components/Loading/Loading';

const EditAssessment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [assessment, setAssessment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAssessment();
    }, [id]);

    const fetchAssessment = async () => {
        try {
            const response = await assessmentAPI.getAssessment(id);
            setAssessment(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to load assessment');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <PageLoading />;

    if (error) {
        return (
            <div className="error-container">
                <p>{error}</p>
                <Button onClick={() => navigate('/institute/assessments')}>Go Back</Button>
            </div>
        );
    }

    return (
        <div className="edit-assessment-page">
            <div className="page-header">
                <div className="page-header-content">
                    <Button
                        variant="ghost"
                        icon={HiOutlineArrowLeft}
                        onClick={() => navigate('/institute/assessments')}
                        className="back-btn"
                    >
                        Back
                    </Button>
                    <h1 className="page-title">Edit Assessment</h1>
                    <p className="page-subtitle">Update your existing assessment</p>
                </div>
            </div>

            <AssessmentForm initialData={assessment} isEdit={true} />
        </div>
    );
};

export default EditAssessment;
