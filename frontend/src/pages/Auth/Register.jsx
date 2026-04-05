import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HiOutlineBookOpen, HiOutlineMail, HiOutlineLockClosed, HiOutlineUser, HiOutlineOfficeBuilding, HiOutlinePhone, HiOutlineArrowLeft } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import { FormGroup, Input, TextArea } from '../../components/Form/Form';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'institute',
    instituteName: '',
    instituteCode: '',
    address: '',
    phone: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <Link to="/" className="back-to-home">
            <HiOutlineArrowLeft />
            Back to Home
          </Link>
          <div className="auth-brand">
            <HiOutlineBookOpen className="brand-icon" />
            <span className="brand-text">AICTE</span>
          </div>
          <h1 className="auth-headline">Join the Network</h1>
          <p className="auth-description">
            Register your institute to access model curriculums and submit your curriculum mappings for approval.
          </p>
          <div className="auth-features">
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Access published curriculums</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Submit curriculum mappings</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Track approval status</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-container auth-container-wide">
          <Link to="/" className="mobile-back-link">
            <HiOutlineArrowLeft />
            Back to Home
          </Link>
          <div className="auth-header">
            <h2 className="auth-title">Create Account</h2>
            <p className="auth-subtitle">Register your institute on the portal</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="auth-error">{error}</div>}
            
            <div className="form-row">
              <FormGroup label="Contact Person Name" required>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter contact person name"
                  icon={HiOutlineUser}
                />
              </FormGroup>

              <FormGroup label="Email" required>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter official email"
                  icon={HiOutlineMail}
                />
              </FormGroup>
            </div>

            <div className="form-row">
              <FormGroup label="Password" required>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create password"
                  icon={HiOutlineLockClosed}
                />
              </FormGroup>

              <FormGroup label="Confirm Password" required>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  icon={HiOutlineLockClosed}
                />
              </FormGroup>
            </div>

            <div className="form-row">
              <FormGroup label="Institute Name" required>
                <Input
                  type="text"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleChange}
                  placeholder="Enter institute name"
                  icon={HiOutlineOfficeBuilding}
                />
              </FormGroup>

              <FormGroup label="Institute Code">
                <Input
                  type="text"
                  name="instituteCode"
                  value={formData.instituteCode}
                  onChange={handleChange}
                  placeholder="AICTE Institute Code"
                />
              </FormGroup>
            </div>

            <FormGroup label="Address">
              <TextArea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter institute address"
                rows={3}
              />
            </FormGroup>

            <FormGroup label="Phone">
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Contact phone number"
                icon={HiOutlinePhone}
              />
            </FormGroup>

            <Button 
              type="submit" 
              variant="primary" 
              size="large" 
              loading={loading}
              fullWidth
            >
              Register Institute
            </Button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Sign in here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
