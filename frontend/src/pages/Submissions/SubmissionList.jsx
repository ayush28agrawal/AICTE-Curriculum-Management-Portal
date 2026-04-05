import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submissionAPI } from '../../services/api';
import Card from '../../components/Card/Card';
import Table from '../../components/Table/Table';
import { PageLoading } from '../../components/Loading/Loading';
import { Select } from '../../components/Form/Form';
import { formatDate, getStatusClass, getStatusLabel } from '../../utils/helpers';
import './Submissions.css';

const SubmissionList = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchSubmissions();
  }, [filter]);

  const fetchSubmissions = async () => {
    try {
      const params = filter ? { status: filter } : {};
      const response = await submissionAPI.getAll(params);
      setSubmissions(response.data.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: 'institute',
      label: 'Institute',
      render: (val) => (
        <div className="cell-stack">
          <span className="cell-primary">{val?.instituteName || val?.name}</span>
          <span className="cell-secondary">{val?.email}</span>
        </div>
      )
    },
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
      label: 'Submitted',
      render: (val) => formatDate(val)
    },
    {
      key: 'reviewedAt',
      label: 'Reviewed',
      render: (val) => formatDate(val)
    }
  ];

  if (loading) return <PageLoading />;

  return (
    <div className="submissions-page">
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Submissions</h1>
          <p className="page-subtitle">Review institute curriculum adoptions</p>
        </div>
      </div>

      <Card noPadding>
        <div className="filters-section">
          <div className="filters-row">
            <div className="filter-item">
              <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                options={[
                  { value: 'submitted', label: 'Pending Review' },
                  { value: 'under_review', label: 'Under Review' },
                  { value: 'approved', label: 'Approved' },
                  { value: 'rejected', label: 'Rejected' }
                ]}
                placeholder="All Status"
              />
            </div>
          </div>
        </div>
        
        <Table 
          columns={columns} 
          data={submissions}
          onRowClick={(row) => navigate(`/submissions/${row._id}`)}
          emptyMessage="No submissions found"
        />
      </Card>
    </div>
  );
};

export default SubmissionList;
