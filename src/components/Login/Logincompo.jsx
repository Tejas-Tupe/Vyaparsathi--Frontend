import React, { useState } from 'react';
import './Login.css'; 
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../Authcontext';

const Logincompo = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Enter a valid email';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the highlighted errors.");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.token);
        localStorage.setItem('token', data.token);
        toast.success('Login successful!');
        setTimeout(() => navigate('/user/dashboard'), 1500);
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (err) {
      toast.error('Server error. Please try again later.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2><i className="fas fa-sign-in-alt"></i> Login</h2>

        <div className="input-group">
          <label htmlFor="email"><i className="fas fa-envelope"></i> Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={errors.email && touched.email ? 'input-error' : ''}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            required
          />
          {errors.email && touched.email && (
            <p className="form-error">{errors.email}</p>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="password"><i className="fas fa-lock"></i> Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={errors.password && touched.password ? 'input-error' : ''}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => handleBlur('password')}
            required
          />
          {errors.password && touched.password && (
            <p className="form-error">{errors.password}</p>
          )}
        </div>

        <button type="submit" className="login-btn">
          <i className="fas fa-sign-in-alt"></i> Log In
        </button>
      </form>
    </div>
  );
};

export default Logincompo;
