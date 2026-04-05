import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { submissionAPI } from '../../services/api';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import { PageLoading } from '../../components/Loading/Loading';
import { formatDate, getStatusClass, getStatusLabel } from '../../utils/helpers';
import './Submissions.css';

const MySubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await submissionAPI.getMySubmissions();
      setSubmissions(response.data.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: 'curriculum',
      label: 'Curriculum',
      render: (val) => (
        <div className="cell-stack">
          <span className="cell-primary">{val?.title}</span>
          <span className="cell-secondary">{val?.programType} • {val?.branch}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      render: (val) => (
        <span className={`status-badge ${getStatusClass(val)}`}>
          {getStatusLabel(val)}
        </span>
      )
    },
    {
      key: 'createdAt',
      label: 'Submitted On',
      render: (val) => formatDate(val)
    },
    {
      key: 'reviewedAt',
      label: 'Reviewed On',
      render: (val) => formatDate(val)
    },
    {
      key: 'adminFeedback',
      label: 'Feedback',
      render: (val) => val ? <span className="feedback-preview">{val}</span> : <span className="cell-muted">-</span>
    }
  ];

  if (loading) return <PageLoading />;

  return (
    <div className="submissions-page">
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">My Submissions</h1>
          <p className="page-subtitle">Track your curriculum adoption submissions</p>
        </div>
        <Button 
          variant="primary"
          icon={HiOutlineBookOpen}
          onClick={() => navigate('/curriculums')}
        >
          View Curriculums
        </Button>
      </div>

      <Card noPadding>
        <Table 
          columns={columns} 
          data={submissions}
          onRowClick={(row) => navigate(`/my-submissions/${row._id}`)}
          emptyMessage="You haven't made any submissions yet"
        />
      </Card>
    </div>
  );
};

export default MySubmissions;
