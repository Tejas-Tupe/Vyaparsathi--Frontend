import React, { useState, useEffect } from 'react';
import './Dashboards.css';
import { toast } from 'react-toastify';

const RefillExistingStockForm = ({ onClose }) => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: '',
    quantity: '',
    price: ''
  });

  const [errors, setErrors] = useState({});

  // Fetch existing products from DB
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/users/products`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setProducts(data.products);
        else toast.error('Failed to load products');
      } catch (err) {
        toast.error('Server error');
        console.error('Product fetch error:', err);
      }
    };

    fetchProducts();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'quantity' || name === 'price' ? Number(value) : value
    }));

    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const { productId, quantity } = formData;
    const newErrors = {};

    if (!productId) newErrors.productId = 'Select a product.';
    if (!quantity || quantity < 1) newErrors.quantity = 'Enter a valid quantity.';
    if (formData.price && formData.price < 1) newErrors.price = 'Price must be valid.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/users/refillstock`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Stock updated successfully');
        onClose();
      } else {
        toast.error(data.error || 'Update failed');
      }
    } catch (err) {
      toast.error('Server error////');
      console.error('Update error:', err);
    }
  };

  return (
    <div className="order-form-wrapper">
      <h2>Refill Existing Stock</h2>
      <form onSubmit={handleSubmit} className="order-form">
        <div className="form-group">
          <label>Select Product*</label>
          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
          >
            <option value="">Choose product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
          {errors.productId && <p className="field-error">{errors.productId}</p>}
        </div>

        <div className="form-inline">
          <div>
            <label>Additional Quantity*</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              min="1"
              onChange={handleChange}
            />
            {errors.quantity && <p className="field-error">{errors.quantity}</p>}
          </div>

          <div>
            <label>New Price*</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              min="1"
              onChange={handleChange}
            />
            {errors.price && <p className="field-error">{errors.price}</p>}
          </div>
        </div>

        <div className="button-row">
          <button type="submit" className="submit-order-btn">Refill</button>
          <button type="button" className="cancel-order-btn" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default RefillExistingStockForm;

// noted render