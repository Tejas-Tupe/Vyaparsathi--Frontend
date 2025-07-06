import React, { useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signupcompo = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    shopName: '',
    shopType: '',
    address: '',
    gstin: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { email, password, confirmPassword } = formData;

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/openaccount/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Signup successful! Please login.");
        setTimeout(() => navigate('/'), 1500);
      } else {
        toast.error(data.error || "Signup failed.");
      }
    } catch (err) {
      toast.error("Server error. Try again later.");
      console.log(err);
    }
  };

  const renderError = (field) =>
    touched[field] && errors[field] ? (
      <p className="form-error">{errors[field]}</p>
    ) : null;

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Create Your Business Account</h2>

        <div className="input-group">
          <label>First Name*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            onBlur={() => handleBlur('firstName')}
            required
          />
        </div>

        <div className="input-group">
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Email*</label>
          <input
            type="email"
            name="email"
            className={errors.email && touched.email ? 'input-error' : ''}
            value={formData.email}
            onChange={handleChange}
            onBlur={() => handleBlur('email')}
            required
          />
          {renderError('email')}
        </div>

        <div className="input-group">
          <label>Mobile Number*</label>
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Password*</label>
          <input
            type="password"
            name="password"
            className={errors.password && touched.password ? 'input-error' : ''}
            value={formData.password}
            onChange={handleChange}
            onBlur={() => handleBlur('password')}
            required
          />
          {renderError('password')}
        </div>

        <div className="input-group">
          <label>Confirm Password*</label>
          <input
            type="password"
            name="confirmPassword"
            className={errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={() => handleBlur('confirmPassword')}
            required
          />
          {renderError('confirmPassword')}
        </div>

        <div className="input-group">
          <label>Shop/Business Name</label>
          <input
            type="text"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Shop Type</label>
          <select name="shopType" value={formData.shopType} onChange={handleChange}>
            <option value="">Select Type</option>
            <option value="kirana">Kirana</option>
            <option value="electronics">Electronics</option>
            <option value="clothing">Clothing</option>
            <option value="services">Services</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="input-group">
          <label>Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange}></textarea>
        </div>

        <div className="input-group">
          <label>GSTIN</label>
          <input type="text" name="gstin" value={formData.gstin} onChange={handleChange} />
        </div>

        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
    </div>
  );
};

export default Signupcompo;
