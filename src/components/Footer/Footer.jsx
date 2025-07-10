// src/components/Footer.jsx
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-tagline">
        Designed, developed, and maintained by Tejas Tupe |{' '}
        <a
          href="https://www.linkedin.com/in/tejastupe/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </p>
    </footer>
  );
};

export default Footer;
