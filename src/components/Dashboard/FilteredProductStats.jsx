import React from 'react';
import './Dashboards.css';

const FilteredProductTable = ({ title, data, onClose }) => {
  return (
    <div className="filtered-product-wrapper">
      <div className="filtered-product-header">
        <h3>{title}</h3>
        <button className="cancel-order-btn" onClick={onClose}>Close</button>
      </div>

      {data.length === 0 ? (
        <p className="empty-message">No products found.</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>Sr no.</th>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data.map((prod, index) => (
              <tr key={prod._id || index}>
                <td>{index + 1}</td>
                <td>{prod.name}</td>
                <td>{prod.category}</td>
                <td>{prod.quantity}</td>
                <td>₹{prod.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FilteredProductTable;
