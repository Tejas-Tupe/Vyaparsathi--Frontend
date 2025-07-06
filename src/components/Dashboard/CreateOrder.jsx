import React, { useState, useEffect } from 'react';
import './CreateOrder.css';
import { toast } from 'react-toastify';

const CreateOrderForm = ({ Onclose }) => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: '',
    productName: '',
    quantity: 1,
    price: 0,
    total: 0
  });

  // Fetch product list on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/users/products`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setProducts(data.products);
        else toast.error("Failed to load products.");
      } catch (err) {
        console.error("Product fetch error:", err);
        toast.error("Error loading products.");
      }
    };
    fetchProducts();
  }, []);

  // Update total on quantity or price change
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      total: prev.quantity * prev.price
    }));
  }, [formData.quantity, formData.price]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'quantity' ? Number(value) : value
    }));
  };

  const handleProductSelect = (e) => {
    const selected = products.find((p) => p._id === e.target.value);
    if (selected) {
      setFormData({
        productId: selected._id,
        productName: selected.name,
        price: selected.price,
        quantity: 1,
        total: selected.price
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { productId, quantity, price } = formData;

    if (!productId || quantity < 1 || price < 1) {
      toast.error("Please complete all required fields.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/users/createorder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Order created successfully!");
        Onclose();
      } else {
        toast.error(data.error || "Order failed.");
      }
    } catch (err) {
      console.error("Order error:", err);
      toast.error("Server error.");
    }
  };

  return (
    <div className="order-form-wrapper">
      <h2>Create Order</h2>
      <form className="order-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Product*</label>
          <select value={formData.productId} onChange={handleProductSelect} required>
            <option value="">Choose product</option>
            {products.map((prod) => (
              <option key={prod._id} value={prod._id}>{prod.name}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Quantity*</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input type="number" value={formData.price} readOnly />
        </div>

        <div className="form-group">
          <label>Total</label>
          <input type="number" value={formData.total} readOnly />
        </div>

        <div className="button-group">
          <button type="submit" className="submit-order-btn">Save Order</button>
          <button type="button" className="cancel-order-btn" onClick={Onclose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrderForm;

// noted render