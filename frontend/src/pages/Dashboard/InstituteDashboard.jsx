import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineBookOpen, 
  HiOutlineUpload, 
  HiOutlineCheckCircle, 
  HiOutlineClock,
  HiOutlineArrowRight
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { curriculumAPI, submissionAPI } from '../../services/api';
import { StatCard } from '../../components/Card/Card';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import { PageLoading } from '../../components/Loading/Loading';
import { formatDate, getStatusClass, getStatusLabel } from '../../utils/helpers';
import './Dashboard.css';

const InstituteDashboard = () => {
  const { user } = useAuth();
  const [curriculums, setCurriculums] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [currRes, subRes] = await Promise.all([
        curriculumAPI.getAll(),
        submissionAPI.getMySubmissions()
      ]);
      setCurriculums(currRes.data.data);
      setSubmissions(subRes.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PageLoading />;

  const stats = {
    available: curriculums.length,
    submitted: submissions.length,
    approved: submissions.filter(s => s.status === 'approved').length,
    pending: submissions.filter(s => s.status === 'submitted' || s.status === 'under_review').length
  };

  const curriculumColumns = [
    { key: 'title', label: 'Title' },
    { key: 'programType', label: 'Program' },
    { key: 'branch', label: 'Branch' },
    { key: 'academicYear', label: 'Year' },
    {
      key: '_id',
      label: 'Status',
      render: (val) => {
        const submitted = submissions.find(s => s.curriculum?._id === val);
        if (submitted) {
          return (
            <span className={`status-badge ${getStatusClass(submitted.status)}`}>
              {getStatusLabel(submitted.status)}
            </span>
          );
        }
        return <span className="status-badge status-available">Available</span>;
      }
    }
  ];

  const submissionColumns = [
    {
      key: 'curriculum',
      label: 'Curriculum',
      render: (val) => val?.title
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
    }
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Welcome back</h1>
          <p className="page-subtitle">{user?.instituteName || user?.name}</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={HiOutlineBookOpen}
          label="Available Curriculums"
          value={stats.available}
          color="primary"
        />
        <StatCard
          icon={HiOutlineUpload}
          label="My Submissions"
          value={stats.submitted}
          color="warning"
        />
        <StatCard
          icon={HiOutlineCheckCircle}
          label="Approved"
          value={stats.approved}
          color="success"
        />
        <StatCard
          icon={HiOutlineClock}
          label="Pending Review"
          value={stats.pending}
          color="warning"
        />
      </div>

      <div className="dashboard-card full-width">
        <div className="card-header">
          <h3>Published Curriculums</h3>
          <Button 
            variant="ghost"
            size="small"
            icon={HiOutlineArrowRight}
            iconPosition="right"
            onClick={() => navigate('/curriculums')}
          >
            View All
          </Button>
        </div>
        <div className="card-body no-padding">
          <Table 
            columns={curriculumColumns} 
            data={curriculums.slice(0, 5)}
            onRowClick={(row) => navigate(`/curriculums/${row._id}`)}
            emptyMessage="No curriculums available"
          />
        </div>
      </div>

      <div className="dashboard-card full-width">
        <div className="card-header">
          <h3>My Submissions</h3>
          <Button 
            variant="ghost"
            size="small"
            icon={HiOutlineArrowRight}
            iconPosition="right"
            onClick={() => navigate('/my-submissions')}
          >
            View All
          </Button>
        </div>
        <div className="card-body no-padding">
          <Table 
            columns={submissionColumns} 
            data={submissions.slice(0, 5)}
            onRowClick={(row) => navigate(`/my-submissions/${row._id}`)}
            emptyMessage="No submissions yet"
          />
        </div>
      </div>
    </div>
  );
};

export default InstituteDashboard;
