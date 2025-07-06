import React, { useEffect, useState } from 'react';
import './Dashboards.css';
import {
  FaBox,
  FaExclamationTriangle,
  FaList,
  FaTimesCircle
} from 'react-icons/fa';
import { toast } from 'react-toastify';

const ProductStats = ({ onStatClick }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/users/productstats`, { // for retreving value of product via category ex. low product : 02
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = await res.json();

        if (res.ok) {
          setStats([
            {
              key: 'total',
              title: 'Total Products',
              value: data.totalProducts,
              icon: <FaBox />,
              color: '#4caf50'
            },
            {
              key: 'low',
              title: 'Low Stock',
              value: data.lowStock,
              icon: <FaExclamationTriangle />,
              color: '#ff9800'
            },
            {
              key: 'categories',
              title: 'Categories',
              value: data.categories,
              icon: <FaList />,
              color: '#03a9f4'
            },
            {
              key: 'out',
              title: 'Out of Stock',
              value: data.outOfStock,
              icon: <FaTimesCircle />,
              color: '#f44336'
            }
          ]);
        } else {
          toast.error(data.error || "Failed to load product stats");
        }
      } catch (err) {
        console.error("Stats fetch error:", err);
        toast.error("Server error while fetching stats");
      }
    };

    fetchStats();
  }, []);

  if (!stats) {
    return <p>Loading product stats...</p>;
  }

  const handleStatClick = (key) => {
    if (onStatClick) onStatClick(key); // calling to parent handler in dashboard component
  };

  return (
    <div className="product-stats-container">
      {stats.map((item, index) => (
        <div
          className="product-card animated-stat clickable"
          key={index}
          style={{ borderLeft: `4px solid ${item.color}` }}
          onClick={() => handleStatClick(item.key)}
        >
          <div className="product-icon" style={{ color: item.color }}>
            {item.icon}
          </div>
          <div className="product-info">
            <h4>{item.title}</h4>
            <p>{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductStats;
