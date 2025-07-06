import React, { useEffect, useState } from 'react';
import './Signup.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditSignupcompo = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    shopName: '',
    shopType: '',
    address: '',
    gstin: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/users/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();
        if (res.ok) {
          setFormData((prev) => ({ ...prev, ...data.user }));
        } else {
          toast.error("Failed to load profile.");
          navigate('/login');
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching user data.");
      }
    };

    fetchUser();
  }, [navigate]);

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
    const { email, mobile } = formData;

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (mobile && !/^[6-9]\d{9}$/.test(mobile)) {
      newErrors.mobile = "Enter valid 10-digit mobile number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderError = (field) =>
    touched[field] && errors[field] ? (
      <p className="form-error">{errors[field]}</p>
    ) : null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the errors.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/users/editprofile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Profile updated successfully.");
        setTimeout(() => navigate('/user/dashboard'), 1500);
      } else {
        toast.error(data.error || "Update failed.");
      }
    } catch (err) {
      toast.error("Server error.");
      console.log(err);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Edit Your Business Profile</h2>

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
            className={errors.mobile && touched.mobile ? 'input-error' : ''}
            value={formData.mobile}
            onChange={handleChange}
            onBlur={() => handleBlur('mobile')}
            required
          />
          {renderError('mobile')}
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

        <button type="submit" className="signup-btn">Update</button>
      </form>
    </div>
  );
};

export default EditSignupcompo;
