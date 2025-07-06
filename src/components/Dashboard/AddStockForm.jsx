import React, { useState } from 'react';
import './Dashboards.css';
import { toast } from 'react-toastify';

const AddStockForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    quantity: 0,
    price: 0,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    const { name, category, quantity, price } = formData;

    if (!name.trim()) newErrors.name = "Product name is required.";
    if (!category) newErrors.category = "Please select a category.";
    if (quantity < 1) newErrors.quantity = "Quantity must be at least 1.";
    if (price < 1) newErrors.price = "Price must be greater than 0.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/users/addstock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Stock added successfully!");
        onClose();
      } else {
        toast.error(data.error || "Failed to add stock");
      }
    } catch (err) {
      console.error("Add stock error:", err);
      toast.error("Server error....");
    }
  };

  return (
    <>
      <div className="order-form-wrapper">
        <h2>Add New Product Stock</h2>
        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-group">
            <label>Product Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>

          <div className="form-group">
            <label>Category*</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select Category</option>
              <option value="groceries">Groceries</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="furniture">Furniture</option>
              <option value="stationery">Stationery</option>
              <option value="others">Others</option>
            </select>
            {errors.category && <p className="field-error">{errors.category}</p>}
          </div>

          <div className="form-inline">
            <div>
              <label>Quantity*</label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={formData.quantity}
                onChange={handleChange}
              />
              {errors.quantity && <p className="field-error">{errors.quantity}</p>}
            </div>

            <div>
              <label>Price per Unit*</label>
              <input
                type="number"
                name="price"
                min="1"
                value={formData.price}
                onChange={handleChange}
              />
              {errors.price && <p className="field-error">{errors.price}</p>}
            </div>
          </div>
          <div className="button-row">
            <button type="submit" className="submit-order-btn">Add Stock</button>
            <button type="button" className="cancel-order-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>

      </div>
    </>
  );
};

export default AddStockForm;


// noted render