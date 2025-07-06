import React, { useState } from 'react';
import AddStockForm from './AddStockForm';
import AddExistingStockForm from './AddInExistingStock';
import './Dashboards.css'; // for toggle tab styling

const AddStockTogglePanel = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('new');

  return (
    <div className="order-form-wrapper">
      <div className="stock-toggle-tabs">
        <button
          className={`tab-btn ${activeTab === 'new' ? 'active' : ''}`}
          onClick={() => setActiveTab('new')}
        >
          ➕ Add New Product
        </button>
        <button
          className={`tab-btn ${activeTab === 'existing' ? 'active' : ''}`}
          onClick={() => setActiveTab('existing')}
        >
          ♻️ Refill Existing Product
        </button>
      </div>

      {/* Render appropriate form */}
      {activeTab === 'new' ? (
        <AddStockForm onClose={onClose} />
      ) : (
        <AddExistingStockForm onClose={onClose} />
      )}
    </div>
  );
};

export default AddStockTogglePanel;

// noted render