import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePlus } from 'react-icons/hi';
import { assessmentAPI } from '../../services/assessmentAPI';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import AssessmentTable from '../../components/assessment/AssessmentTable';
import { PageLoading } from '../../components/Loading/Loading';

const InstituteAssessments = () => {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAssessments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAssessments = async () => {
        try {
            const response = await assessmentAPI.getInstituteAssessments();
            setAssessments(response.data || []);
        } catch (error) {
            console.error('Error fetching assessments:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <PageLoading />;

    return (
        <div className="assessments-page">
            <div className="page-header">
                <div className="page-header-content">
                    <h1 className="page-title">My Assessments</h1>
                    <p className="page-subtitle">Manage your course assessments</p>
                </div>
                <Button
                    variant="primary"
                    icon={HiOutlinePlus}
                    onClick={() => navigate('/institute/assessments/new')}
                >
                    Create Assessment
                </Button>
            </div>

            <Card noPadding>
                <AssessmentTable
                    assessments={assessments}
                    role="institute"
                    onRowClick={(row) => navigate(`/institute/assessments/${row._id}`)}
                />
            </Card>
        </div>
    );
};

export default InstituteAssessments;
