import { Link } from 'react-router-dom';
import { 
  HiOutlineBookOpen, 
  HiOutlineArrowLeft,
  HiOutlineDocumentText,
  HiOutlineCode,
  HiOutlineServer,
  HiOutlineDatabase,
  HiOutlineKey,
  HiOutlineUpload
} from 'react-icons/hi';
import Footer from '../../components/Footer/Footer';
import './Static.css';

const Documentation = () => {
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
            <HiOutlineDocumentText />
          </div>
          <h1>Documentation</h1>
          <p>Complete technical documentation for the AICTE Curriculum Management Portal</p>
        </div>
      </header>

      {/* Content */}
      <main className="static-content">
        {/* Getting Started */}
        <section className="static-section">
          <h2><HiOutlineCode /> Getting Started</h2>
          <p>
            Welcome to the AICTE Curriculum Management Portal documentation. This guide will help you 
            understand how to use the portal effectively based on your role.
          </p>

          <h3>System Requirements</h3>
          <ul>
            <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
            <li>Stable internet connection</li>
            <li>JavaScript enabled in browser</li>
            <li>Minimum screen resolution: 1024x768</li>
          </ul>

          <h3>Accessing the Portal</h3>
          <p>
            The portal can be accessed at <code>https://curriculum.aicte-india.org</code>. 
            You will need valid credentials to access the dashboard features.
          </p>
        </section>

        {/* API Reference */}
        <section className="static-section">
          <h2><HiOutlineServer /> API Reference</h2>
          <p>
            The AICTE Curriculum Portal provides a RESTful API for integration with external systems.
          </p>

          <h3>Base URL</h3>
          <div className="code-block">
            <code>https://api.curriculum.aicte-india.org/api/v1</code>
          </div>

          <h3>Authentication</h3>
          <p>All API requests require a valid JWT token in the Authorization header:</p>
          <div className="code-block">
            <code>Authorization: Bearer &lt;your_jwt_token&gt;</code>
          </div>

          <h3>Endpoints</h3>
          <table className="static-table">
            <thead>
              <tr>
                <th>Method</th>
                <th>Endpoint</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>POST</td>
                <td>/auth/login</td>
                <td>User authentication</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/auth/register</td>
                <td>Institute registration</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/curriculums</td>
                <td>List all curriculums</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/curriculums/:id</td>
                <td>Get curriculum details</td>
              </tr>
              <tr>
                <td>POST</td>
                <td>/submissions</td>
                <td>Create new submission</td>
              </tr>
              <tr>
                <td>GET</td>
                <td>/submissions</td>
                <td>List submissions</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Database Schema */}
        <section className="static-section">
          <h2><HiOutlineDatabase /> Data Models</h2>
          
          <h3>User Model</h3>
          <div className="code-block">
            <code>{`{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: "admin" | "institute",
  instituteName: String,
  instituteCode: String,
  address: String,
  phone: String,
  isActive: Boolean
}`}</code>
          </div>

          <h3>Curriculum Model</h3>
          <div className="code-block">
            <code>{`{
  title: String,
  program: String,
  branch: String,
  academicYear: String,
  version: String,
  status: "draft" | "published",
  semesters: [{
    semesterNumber: Number,
    subjects: [{
      name: String,
      code: String,
      credits: Number,
      type: String,
      learningOutcomes: [String]
    }]
  }],
  syllabusPdf: String,
  totalCredits: Number
}`}</code>
          </div>

          <h3>Submission Model</h3>
          <div className="code-block">
            <code>{`{
  curriculum: ObjectId (ref: Curriculum),
  institute: ObjectId (ref: User),
  mappingDocument: String,
  status: "pending" | "approved" | "rejected",
  remarks: String,
  reviewedBy: ObjectId (ref: User),
  submittedAt: Date,
  reviewedAt: Date
}`}</code>
          </div>
        </section>

        {/* Authentication */}
        <section className="static-section">
          <h2><HiOutlineKey /> Authentication</h2>
          <p>
            The portal uses JWT (JSON Web Tokens) for authentication. Tokens are valid for 7 days 
            after which users need to re-authenticate.
          </p>

          <h3>Login Flow</h3>
          <ol>
            <li>User enters email, password, and selects role</li>
            <li>Server validates credentials against the database</li>
            <li>On success, server returns JWT token</li>
            <li>Token is stored in localStorage for subsequent requests</li>
            <li>All protected routes check for valid token</li>
          </ol>

          <div className="info-box">
            <p><strong>Note:</strong> Passwords are hashed using bcrypt with a salt factor of 12 before storage.</p>
          </div>
        </section>

        {/* File Upload */}
        <section className="static-section">
          <h2><HiOutlineUpload /> File Upload</h2>
          <p>
            The portal supports PDF file uploads for syllabus documents and mapping submissions.
          </p>

          <h3>Upload Specifications</h3>
          <ul>
            <li>Allowed formats: PDF only</li>
            <li>Maximum file size: 10MB</li>
            <li>Files are stored in the /uploads directory</li>
            <li>Unique filenames are generated using timestamps</li>
          </ul>

          <div className="warning-box">
            <p><strong>Important:</strong> Ensure your PDF documents are properly formatted and contain all required information before uploading.</p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Documentation;

