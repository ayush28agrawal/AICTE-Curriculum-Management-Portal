import { Link } from 'react-router-dom';
import { 
  HiOutlineBookOpen, 
  HiOutlineArrowLeft,
  HiOutlineClipboardList,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineLightBulb,
  HiOutlineDocumentDuplicate,
  HiOutlineAcademicCap
} from 'react-icons/hi';
import Footer from '../../components/Footer/Footer';
import './Static.css';

const Guidelines = () => {
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
            <HiOutlineClipboardList />
          </div>
          <h1>Guidelines</h1>
          <p>Official guidelines for curriculum adoption and submission process</p>
        </div>
      </header>

      {/* Content */}
      <main className="static-content">
        {/* For Institutes */}
        <section className="static-section">
          <h2><HiOutlineAcademicCap /> Guidelines for Institutes</h2>
          <p>
            These guidelines are designed to help institutes understand the curriculum adoption 
            process and ensure smooth submission of mapping documents.
          </p>

          <h3>1. Registration Process</h3>
          <ul>
            <li>Use your official institute email ID for registration</li>
            <li>Provide accurate AICTE-approved institute code</li>
            <li>Ensure all contact information is up to date</li>
            <li>Registration is subject to verification by AICTE</li>
          </ul>

          <h3>2. Curriculum Selection</h3>
          <ul>
            <li>Review the published model curriculums carefully</li>
            <li>Select curriculums relevant to your programs and branches</li>
            <li>Download and study the complete syllabus PDF</li>
            <li>Identify any customizations required for your institute</li>
          </ul>

          <h3>3. Mapping Document Preparation</h3>
          <p>Your mapping document should include:</p>
          <ul>
            <li>Cover page with institute details and date</li>
            <li>Executive summary of adoption</li>
            <li>Subject-wise mapping table</li>
            <li>Details of any modifications (if applicable)</li>
            <li>Timeline for implementation</li>
            <li>Authorized signatory approval</li>
          </ul>

          <div className="info-box">
            <p><strong>Tip:</strong> Use the official AICTE mapping document template for faster approval.</p>
          </div>
        </section>

        {/* Submission Guidelines */}
        <section className="static-section">
          <h2><HiOutlineDocumentDuplicate /> Submission Guidelines</h2>
          
          <h3>Document Requirements</h3>
          <ul>
            <li>Format: PDF only</li>
            <li>Maximum file size: 10MB</li>
            <li>Document should be digitally signed or carry official stamp</li>
            <li>All pages should be numbered</li>
            <li>Include table of contents for documents exceeding 10 pages</li>
          </ul>

          <h3>Submission Process</h3>
          <ol>
            <li>Log in to your institute account</li>
            <li>Navigate to the curriculum you wish to adopt</li>
            <li>Click on "Submit Mapping" button</li>
            <li>Upload your prepared mapping document (PDF)</li>
            <li>Add any relevant remarks or notes</li>
            <li>Submit for review</li>
          </ol>

          <h3>After Submission</h3>
          <ul>
            <li>Your submission will be reviewed within 7-10 working days</li>
            <li>You will receive email notification on status change</li>
            <li>If rejected, you can review remarks and resubmit</li>
            <li>Approved submissions will be reflected in your dashboard</li>
          </ul>
        </section>

        {/* Approval Criteria */}
        <section className="static-section">
          <h2><HiOutlineCheckCircle /> Approval Criteria</h2>
          <p>
            Submissions are evaluated based on the following criteria:
          </p>

          <table className="static-table">
            <thead>
              <tr>
                <th>Criteria</th>
                <th>Weightage</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Completeness</td>
                <td>30%</td>
                <td>All required sections are present</td>
              </tr>
              <tr>
                <td>Accuracy</td>
                <td>25%</td>
                <td>Correct mapping of subjects and credits</td>
              </tr>
              <tr>
                <td>Compliance</td>
                <td>25%</td>
                <td>Adherence to AICTE norms</td>
              </tr>
              <tr>
                <td>Documentation</td>
                <td>20%</td>
                <td>Proper formatting and authorization</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Common Mistakes */}
        <section className="static-section">
          <h2><HiOutlineExclamationCircle /> Common Mistakes to Avoid</h2>
          <ul>
            <li>Submitting incomplete mapping documents</li>
            <li>Missing authorized signatures or stamps</li>
            <li>Incorrect calculation of total credits</li>
            <li>Not following the prescribed format</li>
            <li>Uploading low-quality scanned documents</li>
            <li>Mismatch between claimed and actual mappings</li>
            <li>Not including implementation timeline</li>
          </ul>

          <div className="warning-box">
            <p><strong>Warning:</strong> Repeated submissions with the same errors may lead to delays in approval.</p>
          </div>
        </section>

        {/* Best Practices */}
        <section className="static-section">
          <h2><HiOutlineLightBulb /> Best Practices</h2>
          <ul>
            <li>Review the model curriculum thoroughly before adoption</li>
            <li>Involve department heads in the mapping process</li>
            <li>Maintain internal records of curriculum changes</li>
            <li>Update faculty about new curriculum requirements</li>
            <li>Plan infrastructure upgrades if needed for new subjects</li>
            <li>Conduct orientation sessions for students</li>
            <li>Monitor implementation progress regularly</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Guidelines;

