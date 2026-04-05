import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlinePlus } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import { curriculumAPI } from '../../services/api';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import Table from '../../components/Table/Table';
import { PageLoading } from '../../components/Loading/Loading';
import { Select } from '../../components/Form/Form';
import { formatDate, getStatusClass, getStatusLabel } from '../../utils/helpers';
import './Curriculum.css';

const CurriculumList = () => {
  const { isAdmin } = useAuth();
  const [curriculums, setCurriculums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    programType: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurriculums();
  }, [filters]);

  const fetchCurriculums = async () => {
    try {
      const response = await curriculumAPI.getAll(filters);
      setCurriculums(response.data.data);
    } catch (error) {
      console.error('Error fetching curriculums:', error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { key: 'title', label: 'Title' },
    { key: 'programType', label: 'Program' },
    { key: 'branch', label: 'Branch' },
    { key: 'academicYear', label: 'Academic Year' },
    { key: 'version', label: 'Version' },
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
      label: 'Created',
      render: (val) => formatDate(val)
    }
  ];

  if (loading) return <PageLoading />;

  return (
    <div className="curriculum-list-page">
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Curriculums</h1>
          <p className="page-subtitle">
            {isAdmin() ? 'Manage model curriculums' : 'View published curriculums'}
          </p>
        </div>
        {isAdmin() && (
          <Button 
            variant="primary" 
            icon={HiOutlinePlus}
            onClick={() => navigate('/curriculums/create')}
          >
            Create Curriculum
          </Button>
        )}
      </div>

      <Card noPadding>
        <div className="filters-section">
          <div className="filters-row">
            {isAdmin() && (
              <div className="filter-item">
                <Select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  options={[
                    { value: 'draft', label: 'Draft' },
                    { value: 'published', label: 'Published' },
                    { value: 'archived', label: 'Archived' }
                  ]}
                  placeholder="All Status"
                />
              </div>
            )}
            <div className="filter-item">
              <Select
                value={filters.programType}
                onChange={(e) => setFilters({ ...filters, programType: e.target.value })}
                options={[
                  { value: 'UG', label: 'Undergraduate' },
                  { value: 'PG', label: 'Postgraduate' },
                  { value: 'Diploma', label: 'Diploma' }
                ]}
                placeholder="All Programs"
              />
            </div>
          </div>
        </div>
        
        <Table 
          columns={columns} 
          data={curriculums}
          onRowClick={(row) => navigate(`/curriculums/${row._id}`)}
          emptyMessage="No curriculums found"
        />
      </Card>
    </div>
  );
};

export default CurriculumList;
