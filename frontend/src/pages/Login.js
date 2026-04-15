import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import authService from '../services/authService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const loginToast = toast.loading('Logging in...');
    try {
      await authService.login(formData);
      toast.success('Welcome back!', { id: loginToast });
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed', { id: loginToast });
    }
  };

  return (
    <div style={{ padding: '60px 20px', maxWidth: '400px', margin: 'auto' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#1890ff' }}>Login</h2>
        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>Email Address</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              placeholder="name@company.com"
            />
          </div>
          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#666' }}>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" style={{ width: '100%', padding: '14px', backgroundColor: '#1890ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
            Sign In
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '25px', color: '#888', fontSize: '14px' }}>
          New here? <Link to="/register" style={{ color: '#1890ff', textDecoration: 'none', fontWeight: 'bold' }}>Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
