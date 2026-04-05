import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import Button from '../../components/Button/Button';
import AssessmentForm from '../../components/assessment/AssessmentForm';

const CreateAssessment = () => {
    const navigate = useNavigate();

    return (
        <div className="create-assessment-page">
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
                    <h1 className="page-title">Create New Assessment</h1>
                    <p className="page-subtitle">Design an assessment for your course</p>
                </div>
            </div>

            <AssessmentForm />
        </div>
    );
};

export default CreateAssessment;
