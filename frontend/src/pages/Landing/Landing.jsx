import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { 
  HiOutlineBookOpen, 
  HiOutlineClipboardCheck, 
  HiOutlineChartBar, 
  HiOutlineShieldCheck,
  HiOutlineDocumentDownload,
  HiOutlineUserGroup,
  HiOutlineArrowRight,
  HiOutlineCheckCircle
} from 'react-icons/hi';
import LandingNavbar from './LandingNavbar';
import Footer from '../../components/Footer/Footer';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <HiOutlineShieldCheck />
              <span>Official AICTE Portal</span>
            </div>
            
            <h1 className="hero-title">
              Transforming Technical Education with{' '}
              <span className="hero-highlight">
                <TypeAnimation
                  sequence={[
                    'Model Curriculums',
                    2000,
                    'Digital Adoption',
                    2000,
                    'Quality Standards',
                    2000,
                    'Smart Analytics',
                    2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                />
              </span>
            </h1>
            
            <p className="hero-description">
              A centralized platform for AICTE to publish model curriculums and for institutes 
              across India to adopt, track, and submit their curriculum mappings digitally.
            </p>
            
            <div className="hero-cta">
              <Link to="/register" className="cta-primary">
                Get Started
                <HiOutlineArrowRight />
              </Link>
              <Link to="/login" className="cta-secondary">
                Login to Portal
              </Link>
            </div>

            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Institutes</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Curriculums</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">95%</span>
                <span className="stat-label">Adoption Rate</span>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-card hero-card-1">
              <HiOutlineBookOpen className="card-icon" />
              <span>B.Tech CSE 2024</span>
              <div className="card-badge">Published</div>
            </div>
            <div className="hero-card hero-card-2">
              <HiOutlineClipboardCheck className="card-icon" />
              <span>Submission Approved</span>
              <div className="card-progress"></div>
            </div>
            <div className="hero-card hero-card-3">
              <HiOutlineChartBar className="card-icon" />
              <span>Analytics Dashboard</span>
              <div className="card-chart">
                <div className="bar" style={{height: '60%'}}></div>
                <div className="bar" style={{height: '80%'}}></div>
                <div className="bar" style={{height: '45%'}}></div>
                <div className="bar" style={{height: '90%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" id="features">
        <div className="features-container">
          <div className="section-header">
            <span className="section-tag">Features</span>
            <h2 className="section-title">Everything You Need to Manage Curriculums</h2>
            <p className="section-description">
              A comprehensive platform designed for both AICTE administrators and educational institutes
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <HiOutlineBookOpen />
              </div>
              <h3>Curriculum Management</h3>
              <p>Create, edit, and publish model curriculums with detailed semester structures and subjects</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <HiOutlineDocumentDownload />
              </div>
              <h3>Document Handling</h3>
              <p>Upload and download syllabus PDFs securely with proper version control</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <HiOutlineClipboardCheck />
              </div>
              <h3>Submission Tracking</h3>
              <p>Track institute submissions with status updates and admin feedback</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <HiOutlineChartBar />
              </div>
              <h3>Analytics Dashboard</h3>
              <p>Real-time statistics on curriculum adoption rates and institute participation</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <HiOutlineShieldCheck />
              </div>
              <h3>Role-Based Access</h3>
              <p>Secure authentication with separate dashboards for admins and institutes</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <HiOutlineUserGroup />
              </div>
              <h3>Institute Management</h3>
              <p>View and manage registered institutes with their adoption history</p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="workflow-section" id="workflow">
        <div className="workflow-container">
          <div className="section-header">
            <span className="section-tag">How It Works</span>
            <h2 className="section-title">Simple & Efficient Workflow</h2>
            <p className="section-description">
              From curriculum creation to institute adoption - a streamlined digital process
            </p>
          </div>

          <div className="workflow-grid">
            <div className="workflow-column">
              <h3 className="workflow-column-title">
                <span className="workflow-badge admin">Admin</span>
                AICTE Staff
              </h3>
              <div className="workflow-steps">
                <div className="workflow-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Create Curriculum</h4>
                    <p>Define program, branch, semesters and subjects</p>
                  </div>
                </div>
                <div className="workflow-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Upload Syllabus</h4>
                    <p>Attach official PDF document</p>
                  </div>
                </div>
                <div className="workflow-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Publish</h4>
                    <p>Make visible to all institutes</p>
                  </div>
                </div>
                <div className="workflow-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Review & Approve</h4>
                    <p>Process institute submissions</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="workflow-divider">
              <div className="divider-line"></div>
              <div className="divider-icon">
                <HiOutlineArrowRight />
              </div>
              <div className="divider-line"></div>
            </div>

            <div className="workflow-column">
              <h3 className="workflow-column-title">
                <span className="workflow-badge institute">Institute</span>
                College / University
              </h3>
              <div className="workflow-steps">
                <div className="workflow-step">
                  <div className="step-number">1</div>
                  <div className="step-content">
                    <h4>Register & Login</h4>
                    <p>Create institute account</p>
                  </div>
                </div>
                <div className="workflow-step">
                  <div className="step-number">2</div>
                  <div className="step-content">
                    <h4>Browse Curriculums</h4>
                    <p>View published model curriculums</p>
                  </div>
                </div>
                <div className="workflow-step">
                  <div className="step-number">3</div>
                  <div className="step-content">
                    <h4>Download Syllabus</h4>
                    <p>Get official AICTE documents</p>
                  </div>
                </div>
                <div className="workflow-step">
                  <div className="step-number">4</div>
                  <div className="step-content">
                    <h4>Submit Mapping</h4>
                    <p>Upload adoption document</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="about-container">
          <div className="about-content">
            <span className="section-tag">About AICTE</span>
            <h2 className="section-title">Empowering Technical Education</h2>
            <p className="about-text">
              The All India Council for Technical Education (AICTE) is the statutory body 
              and national-level council for technical education under the Department of 
              Higher Education, Ministry of Education, Government of India.
            </p>
            <p className="about-text">
              AICTE is responsible for proper planning and coordinated development of 
              technical education system throughout the country. This portal is an 
              initiative to digitize curriculum management and improve adoption tracking.
            </p>
            
            <div className="about-features">
              <div className="about-feature">
                <HiOutlineCheckCircle />
                <span>Standardized Curriculums</span>
              </div>
              <div className="about-feature">
                <HiOutlineCheckCircle />
                <span>Quality Assurance</span>
              </div>
              <div className="about-feature">
                <HiOutlineCheckCircle />
                <span>Digital Transformation</span>
              </div>
              <div className="about-feature">
                <HiOutlineCheckCircle />
                <span>Nationwide Coverage</span>
              </div>
            </div>
          </div>
          
          <div className="about-image">
            <div className="about-image-wrapper">
              <div className="image-decoration"></div>
              <div className="image-content">
                <HiOutlineBookOpen className="image-icon" />
                <span>AICTE</span>
                <small>Curriculum Portal</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Ready to Get Started?</h2>
            <p>Join hundreds of institutes already using the AICTE Curriculum Portal</p>
            <div className="cta-buttons">
              <Link to="/register" className="cta-btn-primary">
                Register Your Institute
                <HiOutlineArrowRight />
              </Link>
              <Link to="/login" className="cta-btn-secondary">
                Already have an account? Login
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;

