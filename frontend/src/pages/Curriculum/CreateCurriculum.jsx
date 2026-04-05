import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import { curriculumAPI } from '../../services/api';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import { FormGroup, Input, TextArea, Select } from '../../components/Form/Form';
import './Curriculum.css';

const CreateCurriculum = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    programType: '',
    branch: '',
    academicYear: '',
    version: '1.0'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.programType || !formData.branch || !formData.academicYear) {
      setError('Please fill in all required fields');
      return;
    }

    const titleLength = formData.title.trim().length;
    if (titleLength < 5 || titleLength > 120) {
      setError('Title must be between 5 and 120 characters');
      return;
    }
    if (/(.)\1{4,}/.test(formData.title) || /(.)\1{4,}/.test(formData.branch) || (formData.description && /(.)\1{4,}/.test(formData.description))) {
      setError('Text fields cannot contain too many repeating characters (e.g. "aaaaa")');
      return;
    }
    if (!/(?:[a-zA-Z].*){3,}/.test(formData.title) || !/(?:[a-zA-Z].*){2,}/.test(formData.branch) || (formData.description && !/(?:[a-zA-Z].*){3,}/.test(formData.description))) {
      setError('Text fields must contain meaningful alphabetical letters');
      return;
    }
    
    // Also validate academic year format since we enforce it on backend
    if (!/^\d{4}-\d{2}$/.test(formData.academicYear)) {
      setError('Academic year must be in format YYYY-YY (e.g., 2023-24)');
      return;
    }

    setLoading(true);
    try {
      const response = await curriculumAPI.create(formData);
      navigate(`/curriculums/${response.data.data._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create curriculum');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-curriculum-page">
      <div className="page-header">
        <div className="page-header-content">
          <Button 
            variant="ghost" 
            icon={HiOutlineArrowLeft}
            onClick={() => navigate('/curriculums')}
            className="back-btn"
          >
            Back
          </Button>
          <h1 className="page-title">Create New Curriculum</h1>
          <p className="page-subtitle">Define a new model curriculum</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          {error && <div className="form-error-message">{error}</div>}
          
          <FormGroup label="Curriculum Title" required>
            <Input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., B.Tech Computer Science and Engineering"
            />
          </FormGroup>

          <FormGroup label="Description">
            <TextArea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Brief description of the curriculum"
              rows={3}
            />
          </FormGroup>

          <div className="form-row">
            <FormGroup label="Program Type" required>
              <Select
                name="programType"
                value={formData.programType}
                onChange={handleChange}
                options={[
                  { value: 'UG', label: 'Undergraduate (UG)' },
                  { value: 'PG', label: 'Postgraduate (PG)' },
                  { value: 'Diploma', label: 'Diploma' }
                ]}
                placeholder="Select program type"
              />
            </FormGroup>

            <FormGroup label="Branch / Discipline" required>
              <Input
                name="branch"
                value={formData.branch}
                onChange={handleChange}
                placeholder="e.g., Computer Science and Engineering"
              />
            </FormGroup>
          </div>

          <div className="form-row">
            <FormGroup label="Academic Year" required>
              <Input
                name="academicYear"
                value={formData.academicYear}
                onChange={handleChange}
                placeholder="e.g., 2024-25"
              />
            </FormGroup>

            <FormGroup label="Version" required>
              <Input
                name="version"
                value={formData.version}
                onChange={handleChange}
                placeholder="e.g., 1.0"
              />
            </FormGroup>
          </div>

          <div className="form-actions">
            <Button 
              type="button" 
              variant="secondary"
              onClick={() => navigate('/curriculums')}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              loading={loading}
            >
              Create Curriculum
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateCurriculum;
