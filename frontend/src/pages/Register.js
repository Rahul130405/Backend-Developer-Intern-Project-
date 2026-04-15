import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import authService from '../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const navigate = useNavigate();

  const { name, email, password, role } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const regToast = toast.loading('Creating your account...');
    try {
      await authService.register(formData);
      toast.success('Account created! Welcome.', { id: regToast });
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed', { id: regToast });
    }
  };

  return (
    <div style={{ padding: '60px 20px', maxWidth: '450px', margin: 'auto' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1890ff' }}>Register</h2>
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>Full Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={onChange}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              placeholder="John Doe"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              placeholder="john@example.com"
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              placeholder="Min. 6 characters"
            />
          </div>
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>Role</label>
            <select name="role" value={role} onChange={onChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}>
              <option value="user">Standard User</option>
              <option value="admin">Administrator</option>
            </select>
          </div>
          <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
            Create Account
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '25px', color: '#888', fontSize: '14px' }}>
          Already have an account? <Link to="/login" style={{ color: '#1890ff', textDecoration: 'none', fontWeight: 'bold' }}>Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
