import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiOutlineBookOpen, 
  HiOutlineArrowLeft,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlinePaperAirplane,
  HiOutlineGlobe
} from 'react-icons/hi';
import Footer from '../../components/Footer/Footer';
import './Static.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: ''
    });
    setTimeout(() => setSubmitted(false), 5000);
  };

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
            <HiOutlineMail />
          </div>
          <h1>Contact Us</h1>
          <p>Get in touch with us for any queries or assistance</p>
        </div>
      </header>

      {/* Content */}
      <main className="static-content">
        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info-card">
            <h3>Contact Information</h3>
            
            <div className="contact-item">
              <div className="contact-item-icon">
                <HiOutlineLocationMarker />
              </div>
              <div className="contact-item-content">
                <h4>Head Office</h4>
                <p>
                  All India Council for Technical Education<br />
                  Nelson Mandela Marg<br />
                  Vasant Kunj, New Delhi - 110070
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <HiOutlinePhone />
              </div>
              <div className="contact-item-content">
                <h4>Phone</h4>
                <p>
                  Main: 011-29581000<br />
                  Fax: 011-29581012
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <HiOutlineMail />
              </div>
              <div className="contact-item-content">
                <h4>Email</h4>
                <p>
                  General: info@aicte-india.org<br />
                  Support: support@aicte-india.org<br />
                  Curriculum: curriculum@aicte-india.org
                </p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-item-icon">
                <HiOutlineGlobe />
              </div>
              <div className="contact-item-content">
                <h4>Website</h4>
                <p>
                  <a href="https://www.aicte-india.org" target="_blank" rel="noopener noreferrer">
                    www.aicte-india.org
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-card">
            <h3>Send us a Message</h3>
            
            {submitted && (
              <div className="info-box" style={{ marginBottom: '20px' }}>
                <p>Thank you for your message! We will get back to you soon.</p>
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="category">Category</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select a category</option>
                    <option value="general">General Inquiry</option>
                    <option value="technical">Technical Support</option>
                    <option value="curriculum">Curriculum Related</option>
                    <option value="submission">Submission Issues</option>
                    <option value="feedback">Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Brief subject"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please describe your query in detail..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                <HiOutlinePaperAirplane />
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Regional Offices */}
        <section className="static-section">
          <h2>Regional Offices</h2>
          <table className="static-table">
            <thead>
              <tr>
                <th>Region</th>
                <th>Address</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Northern Region</td>
                <td>Chandigarh, Punjab</td>
                <td>0172-2700114</td>
              </tr>
              <tr>
                <td>Southern Region</td>
                <td>Bengaluru, Karnataka</td>
                <td>080-23211022</td>
              </tr>
              <tr>
                <td>Eastern Region</td>
                <td>Kolkata, West Bengal</td>
                <td>033-22826315</td>
              </tr>
              <tr>
                <td>Western Region</td>
                <td>Mumbai, Maharashtra</td>
                <td>022-26544166</td>
              </tr>
              <tr>
                <td>Central Region</td>
                <td>Bhopal, Madhya Pradesh</td>
                <td>0755-2578855</td>
              </tr>
              <tr>
                <td>North-West Region</td>
                <td>Jaipur, Rajasthan</td>
                <td>0141-2715374</td>
              </tr>
              <tr>
                <td>South-West Region</td>
                <td>Hyderabad, Telangana</td>
                <td>040-23221170</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Map Section */}
        <section className="static-section">
          <h2><HiOutlineLocationMarker /> Our Location</h2>
          <div style={{ 
            background: '#F6F8FB', 
            borderRadius: '12px', 
            height: '300px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginTop: '20px'
          }}>
            <div style={{ textAlign: 'center', color: '#64748b' }}>
              <HiOutlineLocationMarker style={{ fontSize: '48px', color: '#2563EB', marginBottom: '12px' }} />
              <p style={{ margin: 0 }}>Nelson Mandela Marg, Vasant Kunj, New Delhi - 110070</p>
              <a 
                href="https://maps.google.com/?q=AICTE+New+Delhi" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px', 
                  marginTop: '12px',
                  color: '#2563EB',
                  textDecoration: 'none'
                }}
              >
                Open in Google Maps
                <HiOutlineGlobe />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;

