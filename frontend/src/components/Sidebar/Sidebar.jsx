import { NavLink } from 'react-router-dom';
import {
  HiOutlineChartBar,
  HiOutlineBookOpen,
  HiOutlinePlusCircle,
  HiOutlineClipboardList,
  HiOutlineOfficeBuilding,
  HiOutlineDocumentText,
  HiOutlineAcademicCap
} from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose }) => {
  const { isAdmin } = useAuth();

  const adminLinks = [
    { to: '/dashboard', icon: HiOutlineChartBar, label: 'Dashboard' },
    { to: '/curriculums', icon: HiOutlineBookOpen, label: 'Curriculums' },
    { to: '/curriculums/create', icon: HiOutlinePlusCircle, label: 'Create Curriculum' },
    { to: '/submissions', icon: HiOutlineClipboardList, label: 'Submissions' },
    { to: '/institutes', icon: HiOutlineOfficeBuilding, label: 'Institutes' },
    { to: '/admin/assessments', icon: HiOutlineAcademicCap, label: 'Assessments' },
  ];

  const instituteLinks = [
    { to: '/dashboard', icon: HiOutlineChartBar, label: 'Dashboard' },
    { to: '/curriculums', icon: HiOutlineBookOpen, label: 'View Curriculums' },
    { to: '/my-submissions', icon: HiOutlineDocumentText, label: 'My Submissions' },
    { to: '/institute/assessments', icon: HiOutlineAcademicCap, label: 'Assessments' },
  ];

  const links = isAdmin() ? adminLinks : instituteLinks;

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="nav-section-title">Menu</span>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `sidebar-link ${isActive ? 'active' : ''}`
                }
                onClick={onClose}
              >
                <link.icon className="link-icon" />
                <span className="link-label">{link.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="sidebar-footer">
          <div className="version-info">
            <span>AICTE Portal v1.0.0</span>
            <span>© 2026 All Rights Reserved</span>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
