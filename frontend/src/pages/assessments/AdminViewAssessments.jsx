import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { assessmentAPI } from '../../services/assessmentAPI';
import Card from '../../components/Card/Card';
import AssessmentTable from '../../components/assessment/AssessmentTable';
import { PageLoading } from '../../components/Loading/Loading';
import { useAuth } from '../../context/AuthContext';

const AdminViewAssessments = () => {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { isAdmin } = useAuth();

    useEffect(() => {
        if (isAdmin()) {
            fetchAssessments();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAdmin]);

    const fetchAssessments = async () => {
        try {
            const response = await assessmentAPI.getAssessments();
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
                    <h1 className="page-title">All Assessments</h1>
                    <p className="page-subtitle">Monitor and view all assessments across institutes</p>
                </div>
            </div>

            <Card noPadding>
                <AssessmentTable
                    assessments={assessments}
                    role="admin"
                    onRowClick={(row) => navigate(`/admin/assessments/${row._id}`)}
                />
            </Card>
        </div>
    );
};

export default AdminViewAssessments;
