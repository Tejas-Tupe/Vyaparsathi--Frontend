import React, { useEffect, useState } from 'react';
import './OrderSummery.css';
import { FaCheckCircle, FaClock, FaTimesCircle, FaPrint, FaEye } from 'react-icons/fa';
import formatDate from '../Utility/DateFormatChanger';

const OrderSummary = ({ ViewAllOrders }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/users/myorders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (res.ok) {
          setOrders(data.orders);
        } else {
          console.error("Order fetch failed:", data.error);
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  const handlePrint = () => {
    window.print(); // PDF export in next phase
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Completed': return <FaCheckCircle color="#4caf50" />;
      case 'Pending': return <FaClock color="#ff9800" />;
      case 'Cancelled': return <FaTimesCircle color="#f44336" />;
      default: return null;
    }
  };

  return (
    <div className="order-summary">
      <div className="order-header">
        <h3 className="table-title">Recent Orders</h3>

        {orders.length > 0 && (
          <div className="order-actions">
            <button className="order-btn" onClick={handlePrint}>
              <FaPrint /> Export
            </button>
            <button className="order-btn" onClick={ViewAllOrders}>
              <FaEye /> View All
            </button>
          </div>
        )}
      </div>

      <div className="order-list">
        {orders.length === 0 ? (
          <div className="empty-orders">
            <FaEye size={40} color="#555" />
            <h4>No orders yet</h4>
            <p>Start by creating your first order using the <strong>Create Order</strong> button.</p>
          </div>
        ) : (
          orders.map((order, index) => (
            <div className="order-card" key={index}>
              <div className="order-id">#{order._id.slice(-5)}</div>
              <div className="order-details">
                <p><strong>{order.customerName}</strong> — ₹{order.total}</p>
                <p>{order.description}</p>
                <span className="order-date">{formatDate(order.createdAt)}</span>
              </div>
              <div className="order-status">
                {getStatusIcon(order.status || "Pending")}
                <span>{order.status || "Pending"}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
