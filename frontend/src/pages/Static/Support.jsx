import { Link } from 'react-router-dom';
import { 
  HiOutlineBookOpen, 
  HiOutlineArrowLeft,
  HiOutlineSupport,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineChat,
  HiOutlineDocumentText,
  HiOutlineQuestionMarkCircle,
  HiOutlineExternalLink,
  HiOutlineClock,
  HiOutlineShieldCheck
} from 'react-icons/hi';
import Footer from '../../components/Footer/Footer';
import './Static.css';

const Support = () => {
  return (
    <div className="static-page">
      {/* Navbar */}
      <nav className="static-navbar">
        <div className="static-navbar-container">
          <Link to="/" className="static-logo">
            <HiOutlineBookOpen className="static-logo-icon" />
            <span className="static-logo-text">AICTE</span>
          </Link>
          <div className="static-nav-actions">
            <Link to="/" className="static-back-btn">
              <HiOutlineArrowLeft />
              Back to Home
            </Link>
            <Link to="/login" className="static-login-btn">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="static-header">
        <div className="static-header-container">
          <div className="static-header-icon">
            <HiOutlineSupport />
          </div>
          <h1>Support Center</h1>
          <p>We're here to help you with any questions or issues</p>
        </div>
      </header>

      {/* Content */}
      <main className="static-content">
        {/* Support Options */}
        <div className="support-cards">
          <div className="support-card">
            <div className="support-card-icon">
              <HiOutlineMail />
            </div>
            <h3>Email Support</h3>
            <p>Send us an email and we'll respond within 24-48 hours</p>
            <a href="mailto:support@aicte-india.org">
              support@aicte-india.org
              <HiOutlineExternalLink />
            </a>
          </div>

          <div className="support-card">
            <div className="support-card-icon">
              <HiOutlinePhone />
            </div>
            <h3>Phone Support</h3>
            <p>Call us during working hours for immediate assistance</p>
            <a href="tel:011-29581000">
              011-29581000
              <HiOutlineExternalLink />
            </a>
          </div>

          <div className="support-card">
            <div className="support-card-icon">
              <HiOutlineChat />
            </div>
            <h3>Live Chat</h3>
            <p>Chat with our support team in real-time</p>
            <a href="#chat">
              Start Chat
              <HiOutlineExternalLink />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <section className="static-section">
          <h2>Quick Links</h2>
          <p>Find answers quickly by exploring our resources:</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
            <Link to="/documentation" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '16px', 
              background: '#F6F8FB', 
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#1E293B',
              transition: 'all 0.2s ease'
            }}>
              <HiOutlineDocumentText style={{ fontSize: '24px', color: '#2563EB' }} />
              <span style={{ fontWeight: '500' }}>Documentation</span>
            </Link>
            
            <Link to="/guidelines" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '16px', 
              background: '#F6F8FB', 
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#1E293B',
              transition: 'all 0.2s ease'
            }}>
              <HiOutlineShieldCheck style={{ fontSize: '24px', color: '#2563EB' }} />
              <span style={{ fontWeight: '500' }}>Guidelines</span>
            </Link>
            
            <Link to="/faqs" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '16px', 
              background: '#F6F8FB', 
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#1E293B',
              transition: 'all 0.2s ease'
            }}>
              <HiOutlineQuestionMarkCircle style={{ fontSize: '24px', color: '#2563EB' }} />
              <span style={{ fontWeight: '500' }}>FAQs</span>
            </Link>
            
            <Link to="/contact" style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '16px', 
              background: '#F6F8FB', 
              borderRadius: '12px',
              textDecoration: 'none',
              color: '#1E293B',
              transition: 'all 0.2s ease'
            }}>
              <HiOutlineMail style={{ fontSize: '24px', color: '#2563EB' }} />
              <span style={{ fontWeight: '500' }}>Contact Us</span>
            </Link>
          </div>
        </section>

        {/* Support Hours */}
        <section className="static-section">
          <h2><HiOutlineClock /> Support Hours</h2>
          <table className="static-table">
            <thead>
              <tr>
                <th>Day</th>
                <th>Hours (IST)</th>
                <th>Availability</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Monday - Friday</td>
                <td>9:00 AM - 6:00 PM</td>
                <td>Phone, Email, Chat</td>
              </tr>
              <tr>
                <td>Saturday</td>
                <td>10:00 AM - 2:00 PM</td>
                <td>Email Only</td>
              </tr>
              <tr>
                <td>Sunday</td>
                <td>Closed</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Public Holidays</td>
                <td>Closed</td>
                <td>-</td>
              </tr>
            </tbody>
          </table>
          <div className="info-box">
            <p><strong>Note:</strong> Email support queries received outside working hours will be addressed on the next working day.</p>
          </div>
        </section>

        {/* Common Issues */}
        <section className="static-section">
          <h2>Common Issues & Solutions</h2>
          
          <h3>Login Problems</h3>
          <ul>
            <li>Ensure you are selecting the correct role (Admin/Institute)</li>
            <li>Check if Caps Lock is enabled</li>
            <li>Clear browser cache and cookies</li>
            <li>Try the "Forgot Password" option</li>
          </ul>

          <h3>Upload Failures</h3>
          <ul>
            <li>Verify the file is in PDF format</li>
            <li>Check if file size is under 10MB</li>
            <li>Ensure stable internet connection</li>
            <li>Try a different browser</li>
          </ul>

          <h3>Submission Issues</h3>
          <ul>
            <li>Ensure all required fields are filled</li>
            <li>Wait for previous submission to be processed</li>
            <li>Check your internet connection</li>
            <li>Contact support if error persists</li>
          </ul>
        </section>

        {/* Escalation */}
        <section className="static-section">
          <h2>Escalation Process</h2>
          <p>
            If your issue is not resolved within the expected timeframe, you can escalate your concern:
          </p>
          <ol>
            <li><strong>Level 1:</strong> Contact regular support via email/phone (Response: 24-48 hours)</li>
            <li><strong>Level 2:</strong> Write to escalations@aicte-india.org (Response: 48-72 hours)</li>
            <li><strong>Level 3:</strong> Contact the Member Secretary, AICTE (Response: 5-7 working days)</li>
          </ol>
          <div className="warning-box">
            <p><strong>Important:</strong> Please include your ticket/reference number when escalating an issue.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Support;

