import { useState } from 'react';
import { HiOutlineBookOpen, HiOutlineLogout, HiOutlineMenu, HiOutlineX } from 'react-icons/hi';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = ({ onMenuToggle, isSidebarOpen }) => {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <button className="menu-toggle" onClick={onMenuToggle}>
          {isSidebarOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
        <div className="navbar-brand">
          <div className="navbar-logo">
            <HiOutlineBookOpen className="logo-icon" />
            <span className="logo-text">AICTE</span>
          </div>
          <span className="navbar-divider"></span>
          <span className="navbar-title">Curriculum Management Portal</span>
        </div>
      </div>
      
      <div className="navbar-user">
        <div className="user-info">
          <span className="user-name">{user?.name}</span>
          <span className="user-role">{user?.role === 'admin' ? 'Administrator' : 'Institute'}</span>
        </div>
        <div className="user-avatar">
          {user?.name?.charAt(0).toUpperCase()}
        </div>
        <button className="logout-btn" onClick={logout} title="Logout">
          <HiOutlineLogout size={20} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
