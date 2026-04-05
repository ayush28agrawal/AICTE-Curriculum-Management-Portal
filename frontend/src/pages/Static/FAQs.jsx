import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiOutlineBookOpen, 
  HiOutlineArrowLeft,
  HiOutlineQuestionMarkCircle,
  HiOutlineChevronDown
} from 'react-icons/hi';
import Footer from '../../components/Footer/Footer';
import './Static.css';

const FAQs = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      category: "General",
      questions: [
        {
          q: "What is the AICTE Curriculum Management Portal?",
          a: "The AICTE Curriculum Management Portal is a centralized digital platform that allows AICTE to publish model curriculums and enables technical education institutes across India to adopt, track, and submit their curriculum mappings digitally."
        },
        {
          q: "Who can use this portal?",
          a: "The portal is designed for two types of users: AICTE Administrators who create and publish model curriculums, and Institute Representatives who view curriculums and submit adoption mappings on behalf of their institutions."
        },
        {
          q: "Is there any cost to use this portal?",
          a: "No, the portal is completely free to use for all AICTE-approved institutes. There are no registration fees or subscription charges."
        }
      ]
    },
    {
      category: "Registration & Login",
      questions: [
        {
          q: "How do I register my institute on the portal?",
          a: "Click on 'Get Started' or 'Register' button on the homepage. Fill in your institute details including the official AICTE institute code, email, and contact information. Submit the form and wait for verification. Once verified, you can log in using your credentials."
        },
        {
          q: "I forgot my password. How can I reset it?",
          a: "Click on 'Forgot Password' on the login page. Enter your registered email address. You will receive a password reset link via email. Follow the link to set a new password. The link expires in 24 hours."
        },
        {
          q: "Can multiple users from the same institute access the portal?",
          a: "Currently, each institute gets one primary account. However, the login credentials can be shared with authorized personnel within your institute. We recommend designating one person as the primary coordinator for consistency."
        }
      ]
    },
    {
      category: "Curriculum",
      questions: [
        {
          q: "How often are new curriculums published?",
          a: "AICTE typically publishes updated model curriculums at the beginning of each academic year. However, special updates may be released as needed to incorporate new technologies or regulatory changes."
        },
        {
          q: "Can I download the curriculum syllabus PDF?",
          a: "Yes, all published curriculums have downloadable syllabus PDFs. Simply navigate to the curriculum details page and click the 'Download Syllabus' button."
        },
        {
          q: "Are modifications allowed in the model curriculum?",
          a: "Institutes can make minor modifications (up to 20% of the curriculum) to suit their regional or industry-specific needs. However, these modifications must be documented in the mapping document and justified during submission."
        }
      ]
    },
    {
      category: "Submissions",
      questions: [
        {
          q: "What format should my mapping document be in?",
          a: "The mapping document must be in PDF format only. Maximum file size allowed is 10MB. The document should include all required sections as per the guidelines."
        },
        {
          q: "How long does the approval process take?",
          a: "Typically, submissions are reviewed within 7-10 working days. You will receive email notifications when the status of your submission changes."
        },
        {
          q: "What happens if my submission is rejected?",
          a: "If your submission is rejected, you will see the reviewer's remarks explaining the reason. You can address the issues mentioned and resubmit a corrected mapping document. There is no limit on the number of resubmissions."
        },
        {
          q: "Can I update a submission after it has been approved?",
          a: "Once approved, submissions cannot be modified. If you need to make changes, you will need to create a new submission for the same curriculum with the updated mapping document."
        }
      ]
    },
    {
      category: "Technical Issues",
      questions: [
        {
          q: "The portal is loading slowly. What should I do?",
          a: "First, check your internet connection. Try clearing your browser cache and cookies. If the issue persists, try using a different browser or device. If the problem continues, contact our technical support."
        },
        {
          q: "I'm getting an error while uploading my document. How can I fix it?",
          a: "Ensure your document is in PDF format and under 10MB. Check if your internet connection is stable. Try compressing the PDF if it's too large. If errors persist, try uploading from a different browser."
        },
        {
          q: "Which browsers are supported?",
          a: "The portal supports all modern browsers including Google Chrome (recommended), Mozilla Firefox, Microsoft Edge, and Safari. We recommend using the latest version of your preferred browser for the best experience."
        }
      ]
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  let faqIndex = 0;

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
            <HiOutlineQuestionMarkCircle />
          </div>
          <h1>Frequently Asked Questions</h1>
          <p>Find answers to common questions about the AICTE Curriculum Portal</p>
        </div>
      </header>

      {/* Content */}
      <main className="static-content">
        {faqs.map((category, catIndex) => (
          <section className="static-section" key={catIndex}>
            <h2>{category.category}</h2>
            <div className="faq-list">
              {category.questions.map((faq, qIndex) => {
                const currentIndex = faqIndex++;
                return (
                  <div 
                    className={`faq-item ${openFaq === currentIndex ? 'open' : ''}`} 
                    key={qIndex}
                  >
                    <button 
                      className="faq-question" 
                      onClick={() => toggleFaq(currentIndex)}
                    >
                      {faq.q}
                      <HiOutlineChevronDown />
                    </button>
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* Still Have Questions */}
        <section className="static-section">
          <h2>Still Have Questions?</h2>
          <p>
            If you couldn't find the answer you were looking for, please don't hesitate to reach out to us.
          </p>
          <p>
            <Link to="/contact">Contact our support team</Link> or email us at{' '}
            <a href="mailto:support@aicte-india.org">support@aicte-india.org</a>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FAQs;

