import React, { useEffect, useState } from 'react';
import './Dashboards.css';
import formatDate from '../Utility/DateFormatChanger';

const FullOrderTable = ({ onClose }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/users/mydetailedorders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (res.ok) {
          setOrders(data.orders);
        } else {
          console.error("Failed to fetch orders");
        }
      } catch (err) {
        console.error("Server error", err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="user-table-wrapper">
      <div className="table-header">
        <h3 className="table-title">📋 All Orders</h3>
        <button className="cancel-order-btn" onClick={onClose}>
          Close
        </button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Order ID</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="6">No orders found.</td>
            </tr>
          ) : (
            orders.map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order._id}</td>
                <td>{order.quantity}</td>
                <td>₹{order.price}</td>
                <td>₹{order.total}</td>
                <td>{formatDate(order.createdAt)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FullOrderTable;
