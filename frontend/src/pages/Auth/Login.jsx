import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HiOutlineBookOpen, HiOutlineMail, HiOutlineLockClosed, HiOutlineArrowLeft } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';
import { FormGroup, Input, Select } from '../../components/Form/Form';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password || !formData.role) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await login(formData.email, formData.password, formData.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
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
          <h1 className="auth-headline">Curriculum Management Portal</h1>
          <p className="auth-description">
            A centralized platform for managing model curriculums and tracking institute adoptions across India.
          </p>
          <div className="auth-features">
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Create and publish model curriculums</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Track institute adoption rates</span>
            </div>
            <div className="feature-item">
              <div className="feature-dot"></div>
              <span>Secure document management</span>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-container">
          <Link to="/" className="mobile-back-link">
            <HiOutlineArrowLeft />
            Back to Home
          </Link>
          <div className="auth-header">
            <h2 className="auth-title">Welcome back</h2>
            <p className="auth-subtitle">Sign in to your account to continue</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="auth-error">{error}</div>}
            
            <FormGroup label="Select Role" required>
              <Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={[
                  { value: 'admin', label: 'Admin (AICTE Staff)' },
                  { value: 'institute', label: 'Institute (College/University)' }
                ]}
                placeholder="Choose your role"
              />
            </FormGroup>

            <FormGroup label="Email Address" required>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                icon={HiOutlineMail}
              />
            </FormGroup>

            <FormGroup label="Password" required>
              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                icon={HiOutlineLockClosed}
              />
            </FormGroup>

            <Button 
              type="submit" 
              variant="primary" 
              size="large" 
              loading={loading}
              fullWidth
            >
              Sign In
            </Button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
          </div>

          {/* <div className="auth-demo">
            <p className="demo-title">Demo Credentials</p>
            <div className="demo-credentials">
              <div className="demo-item">
                <span className="demo-label">Admin:</span>
                <span>admin@aicte.gov.in / admin123</span>
              </div>
              <div className="demo-item">
                <span className="demo-label">Institute:</span>
                <span>admin@iitd.ac.in / institute123</span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
