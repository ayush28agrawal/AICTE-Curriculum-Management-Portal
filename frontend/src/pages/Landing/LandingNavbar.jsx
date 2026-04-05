import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineBookOpen, HiOutlineX, HiOutlineMenu } from 'react-icons/hi';
import './Landing.css';

const LandingNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="landing-navbar">
      <div className="landing-navbar-container">
        <Link to="/" className="landing-logo">
          <HiOutlineBookOpen className="landing-logo-icon" />
          <span className="landing-logo-text">AICTE</span>
        </Link>

        <div className="landing-nav-links">
          <a href="#features" className="landing-nav-link">Features</a>
          <a href="#workflow" className="landing-nav-link">How it Works</a>
          <a href="#about" className="landing-nav-link">About</a>
        </div>

        <div className="landing-nav-actions">
          <Link to="/login" className="landing-btn-secondary">
            Login
          </Link>
          <Link to="/register" className="landing-btn-primary">
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="landing-mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-links">
          <a href="#features" className="mobile-menu-link" onClick={closeMobileMenu}>Features</a>
          <a href="#workflow" className="mobile-menu-link" onClick={closeMobileMenu}>How it Works</a>
          <a href="#about" className="mobile-menu-link" onClick={closeMobileMenu}>About</a>
        </div>
        <div className="mobile-menu-actions">
          <Link to="/login" className="mobile-menu-btn-secondary" onClick={closeMobileMenu}>
            Login
          </Link>
          <Link to="/register" className="mobile-menu-btn-primary" onClick={closeMobileMenu}>
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default LandingNavbar;
