import React, { useState } from 'react';
import './ChangePassword.css';
import { toast } from 'react-toastify';

const ChangePasswordModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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
    const { oldPassword, newPassword, confirmPassword } = formData;
    const newErrors = {};

    if (!oldPassword.trim()) {
      newErrors.oldPassword = "Current password is required.";
    }

    if (!newPassword) {
      newErrors.newPassword = "New password is required.";
    } else if (newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password.";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
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
      const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/users/changepassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword
        })
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password changed successfully.");
        onClose();
      } else {
        toast.error(data.error || "Failed to change password.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="password-modal animate-fadeIn">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="oldPassword"
            placeholder="Current Password"
            value={formData.oldPassword}
            onChange={handleChange}
            onBlur={() => handleBlur('oldPassword')}
            className={errors.oldPassword && touched.oldPassword ? 'input-error' : ''}
          />
          {renderError('oldPassword')}

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={formData.newPassword}
            onChange={handleChange}
            onBlur={() => handleBlur('newPassword')}
            className={errors.newPassword && touched.newPassword ? 'input-error' : ''}
          />
          {renderError('newPassword')}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={() => handleBlur('confirmPassword')}
            className={errors.confirmPassword && touched.confirmPassword ? 'input-error' : ''}
          />
          {renderError('confirmPassword')}

          <div className="modal-buttons">
            <button type="submit">Update</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
