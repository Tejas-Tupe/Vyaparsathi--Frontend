// src/pages/Home.jsx
import React from 'react';
import './Home.css';

const Homecompo = () => {
  return (
    <div className="container home">
      <section className="hero center">
        <h1>Welcome to Vyaparsathi</h1>
        <p>Your all-in-one business assistant. Manage your business like a pro — smarter, faster, and Gen-Z ready.</p>
        <a href='user/dashboard'><button className="cta-btn">Get Started</button></a>
      </section>

      <section className="features">
        <h2>Why Vyaparsathi?</h2>
        <ul className="feature-list">
          <li>
            <i className="fas fa-boxes feature-icon"></i>
            <span>Create and manage business profiles</span>
          </li>
          <li>
            <i className="fas fa-store feature-icon"></i>
            <span>Add and showcase products/services</span>
          </li>
          <li>
            <i className="fas fa-chart-bar feature-icon"></i>
            <span>Track everything from one dashboard</span>
          </li>
          <li>
            <i className="fas fa-brain feature-icon"></i>
            <span>Smart, modern, and made for Gen-Z businesses</span>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Homecompo;
