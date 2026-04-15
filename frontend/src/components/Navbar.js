import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = () => {
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const onLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav style={{ 
      padding: '15px 40px', 
      backgroundColor: 'white', 
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ backgroundColor: '#1890ff', color: 'white', width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>T</div>
        <h2 style={{ margin: 0, fontSize: '20px' }}>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333', fontWeight: 'bold' }}>TaskManager</Link>
        </h2>
      </div>
      <div>
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span style={{ fontSize: '14px', color: '#666' }}>
              Logged in as <strong style={{ color: '#333' }}>{user.name}</strong>
            </span>
            <button 
              onClick={onLogout}
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#fff', 
                color: '#ff4d4f', 
                border: '1px solid #ff4d4f', 
                borderRadius: '6px', 
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '15px' }}>
            <Link to="/login" style={{ textDecoration: 'none', color: '#1890ff', fontSize: '14px', fontWeight: '500' }}>Login</Link>
            <Link to="/register" style={{ textDecoration: 'none', backgroundColor: '#1890ff', color: 'white', padding: '8px 16px', borderRadius: '6px', fontSize: '14px', fontWeight: '500' }}>Sign Up</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
