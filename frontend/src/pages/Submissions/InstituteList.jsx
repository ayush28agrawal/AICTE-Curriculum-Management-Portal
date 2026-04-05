import { useState, useEffect } from 'react';
import { authAPI } from '../../services/api';
import Card from '../../components/Card/Card';
import Table from '../../components/Table/Table';
import { PageLoading } from '../../components/Loading/Loading';
import { formatDate } from '../../utils/helpers';
import './Submissions.css';

const InstituteList = () => {
  const [institutes, setInstitutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInstitutes();
  }, []);

  const fetchInstitutes = async () => {
    try {
      const response = await authAPI.getInstitutes();
      setInstitutes(response.data.data);
    } catch (error) {
      console.error('Error fetching institutes:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: 'instituteName',
      label: 'Institute Name',
      render: (val, row) => (
        <div className="cell-stack">
          <span className="cell-primary">{val || row.name}</span>
          <span className="cell-secondary">{row.instituteCode || '-'}</span>
        </div>
      )
    },
    {
      key: 'email',
      label: 'Contact'
    },
    {
      key: 'phone',
      label: 'Phone',
      render: (val) => val || <span className="cell-muted">-</span>
    },
    {
      key: 'address',
      label: 'Address',
      render: (val) => val ? <span className="address-cell">{val}</span> : <span className="cell-muted">-</span>
    },
    {
      key: 'createdAt',
      label: 'Registered',
      render: (val) => formatDate(val)
    },
    {
      key: 'isActive',
      label: 'Status',
      render: (val) => (
        <span className={`status-badge ${val ? 'status-approved' : 'status-rejected'}`}>
          {val ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  if (loading) return <PageLoading />;

  return (
    <div className="submissions-page">
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Registered Institutes</h1>
          <p className="page-subtitle">All institutes registered on the portal</p>
        </div>
      </div>

      <Card noPadding>
        <Table 
          columns={columns} 
          data={institutes}
          emptyMessage="No institutes registered yet"
        />
      </Card>
    </div>
  );
};

export default InstituteList;
