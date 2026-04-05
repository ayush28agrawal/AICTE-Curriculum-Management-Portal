import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HiOutlineBookOpen, 
  HiOutlineCheckCircle, 
  HiOutlineOfficeBuilding, 
  HiOutlineClipboardList,
  HiOutlineArrowRight
} from 'react-icons/hi';
import { analyticsAPI, submissionAPI } from '../../services/api';
import { StatCard } from '../../components/Card/Card';
import Table from '../../components/Table/Table';
import Button from '../../components/Button/Button';
import { PageLoading } from '../../components/Loading/Loading';
import { formatDate, getStatusClass, getStatusLabel } from '../../utils/helpers';
import './Dashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentSubmissions, setRecentSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, submissionsRes] = await Promise.all([
        analyticsAPI.getDashboardStats(),
        submissionAPI.getAll({ limit: 5 })
      ]);
      setStats(statsRes.data.data);
      setRecentSubmissions(submissionsRes.data.data.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PageLoading />;

  const submissionColumns = [
    {
      key: 'institute',
      label: 'Institute',
      render: (val) => val?.instituteName || val?.name
    },
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
      label: 'Submitted',
      render: (val) => formatDate(val)
    }
  ];

  return (
    <div className="dashboard">
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview of curriculum management system</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          icon={HiOutlineBookOpen}
          label="Total Curriculums"
          value={stats?.curriculums?.total || 0}
          color="primary"
        />
        <StatCard
          icon={HiOutlineCheckCircle}
          label="Published"
          value={stats?.curriculums?.published || 0}
          color="success"
        />
        <StatCard
          icon={HiOutlineOfficeBuilding}
          label="Registered Institutes"
          value={stats?.users?.institutes || 0}
          color="primary"
        />
        <StatCard
          icon={HiOutlineClipboardList}
          label="Total Submissions"
          value={stats?.submissions?.total || 0}
          color="warning"
        />
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3>Submission Statistics</h3>
          </div>
          <div className="card-body">
            <div className="stat-bars">
              <div className="stat-bar-item">
                <div className="stat-bar-label">
                  <span>Pending Review</span>
                  <span className="stat-bar-value">{stats?.submissions?.submitted || 0}</span>
                </div>
                <div className="stat-bar">
                  <div 
                    className="stat-bar-fill warning" 
                    style={{ width: `${(stats?.submissions?.submitted / Math.max(stats?.submissions?.total, 1) * 100) || 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="stat-bar-item">
                <div className="stat-bar-label">
                  <span>Approved</span>
                  <span className="stat-bar-value">{stats?.submissions?.approved || 0}</span>
                </div>
                <div className="stat-bar">
                  <div 
                    className="stat-bar-fill success" 
                    style={{ width: `${(stats?.submissions?.approved / Math.max(stats?.submissions?.total, 1) * 100) || 0}%` }}
                  ></div>
                </div>
              </div>
              <div className="stat-bar-item">
                <div className="stat-bar-label">
                  <span>Rejected</span>
                  <span className="stat-bar-value">{stats?.submissions?.rejected || 0}</span>
                </div>
                <div className="stat-bar">
                  <div 
                    className="stat-bar-fill danger" 
                    style={{ width: `${(stats?.submissions?.rejected / Math.max(stats?.submissions?.total, 1) * 100) || 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="card-header">
            <h3>Adoption Rate</h3>
          </div>
          <div className="card-body adoption-card">
            <div className="adoption-circle">
              <span className="adoption-value">{stats?.adoptionRate || 0}%</span>
              <span className="adoption-label">Institutes Adopted</span>
            </div>
          </div>
        </div>
      </div>

      <div className="dashboard-card full-width">
        <div className="card-header">
          <h3>Recent Submissions</h3>
          <Button 
            variant="ghost"
            size="small"
            icon={HiOutlineArrowRight}
            iconPosition="right"
            onClick={() => navigate('/submissions')}
          >
            View All
          </Button>
        </div>
        <div className="card-body no-padding">
          <Table 
            columns={submissionColumns} 
            data={recentSubmissions}
            onRowClick={(row) => navigate(`/submissions/${row._id}`)}
            emptyMessage="No submissions yet"
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
