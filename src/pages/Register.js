import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../utils/api';

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    country_code: '+91',
    phone_number: '',
    password: '',
    confirm_password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    for (const key in formData) {
      if (!formData[key]) {
        setError('All fields are required');
        return;
      }
    }

    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }

    try {
      const payload = {
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        email: formData.email.trim(),
        country_code: formData.country_code.trim(),
        phone_number: formData.phone_number.trim(),
        password: formData.password,
        confirm_password: formData.confirm_password
      };

      await registerUser(payload);
      
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <main className="auth-wrapper">
      <div className="register-box">
        <h2>Create Account</h2>
        {error && <div id="error" style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</div>}
        {success && <div id="success" style={{ color: 'green', textAlign: 'center', marginBottom: '10px' }}>{success}</div>}
        <form onSubmit={handleSubmit} className="register-form">
          <input
            id="first_name"
            placeholder="First Name"
            value={formData.first_name}
            onChange={handleChange}
          />
          <input
            id="last_name"
            placeholder="Last Name"
            value={formData.last_name}
            onChange={handleChange}
          />
          <input
            id="email"
            placeholder="Email"
            className="full-width"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            id="country_code"
            value={formData.country_code}
            onChange={handleChange}
          />
          <input
            id="phone_number"
            placeholder="Phone Number"
            value={formData.phone_number}
            onChange={handleChange}
          />
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            id="confirm_password"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirm_password}
            onChange={handleChange}
          />
          <button type="submit" className="full-width">Register</button>
        </form>
        <div className="register-links">
          <Link to="/login">Already have an account? Login</Link>
        </div>
      </div>
    </main>
  );
};

export default Register;