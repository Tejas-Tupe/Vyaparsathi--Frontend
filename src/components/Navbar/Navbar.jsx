import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

const Navbarcompo = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="/" className="logo">
          Vyaparsathi
        </a>

        <ul className="nav-links">
          <li><a href="/"><i className="fas fa-home"></i> Home</a></li>
          <li><a href="#"><i className="fas fa-tools"></i> Features</a></li>
          <li><a href="#"><i className="fas fa-users"></i> About Us</a></li>

          {isAuthenticated ? (
            <>
              <li><a href="/user/dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</a></li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  <i className="fas fa-sign-out-alt"></i> Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li><a href="/signup"><i className="fas fa-user-plus"></i> Sign Up</a></li>
              <li><a href="/login"><i className="fas fa-sign-in-alt"></i> Login</a></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbarcompo;
