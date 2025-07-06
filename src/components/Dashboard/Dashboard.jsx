import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Sidebarcompo from './Sidebar';
import UserProfilecompo from './Userprofile';
import './Dashboards.css';
import UserTable from './Usertable';
import ProductStats from './ProductStats';
import OrderSummary from './OrderSummery';
import DashboardFooter from './DashBoardFooter';
import ChangePasswordModal from '../Signup/ChangePassword';
import Navbarcompo from '../Navbar/Navbar';
import CreateOrderForm from './CreateOrder';
import FullOrderTable from './FullOrders';
import Footer from '../Footer/Footer';
import AddStockTogglePanel from './AddStockBothForms';
import FilteredProductTable from './FilteredProductStats';

const Dashboardcompo = () => {
  const [user, setUser] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const navigate = useNavigate();
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [ShowAddStockForm, setShowAddStockForm] = useState(false);
  const [statFilter, setStatFilter] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

const handleStatFilter = async (filterKey) => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/users/products/filter?type=${filterKey}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (res.ok) {
      let label = "";
      let displayData = [];

      switch (filterKey) {
        case 'low':
          label = "Low Stock Products";
          displayData = data.products;
          break;
        case 'out':
          label = "Out of Stock Products";
          displayData = data.products;
          break;
        case 'total':
          label = "All Products";
          displayData = data.products;
          break;
        case 'categories':
          label = "Available Categories";
          displayData = data.categories.map((cat, i) => ({
            name: "-",
            category: cat, 
            quantity: "-",
            price: "-"
          }));
          break;
        default:
          label = "Categories";
          displayData = [];
      }

      setStatFilter(label);
      setFilteredProducts(displayData);
    } else {
      toast.error(data.error || "Failed to load filtered data");
    }
  } catch (err) {
    console.error("Filter fetch error:", err);
    toast.error("Error loading filtered data");
  }
};
  useEffect(() => {
    const fetchDashboard = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error("Please login to access dashboard.");
        navigate('/login');
        return;
      }

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/users/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (!res.ok) {
          toast.error(data.error || "Unauthorized access.");
          navigate('/login');
          return;
        }

        setUser(data.user);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        toast.error("Server error, try again later.");
        navigate('/login');
      }
    };

    fetchDashboard();
  }, [navigate]);

  if (!user) {
    return <div className="container"><p>Loading dashboard...</p></div>;
  }

  return (
    <>
      <Navbarcompo />
      <div className="dashboard-shell">
        {/* Main Content */}
        <main className="dashboard-main">
          <div className="container">
            {/* Header */}
            <header className="dashboard-header animate-fadeIn">
              <UserProfilecompo user={user} CreateorderProp={() => setShowOrderForm(true)} ShowAddStock={() => { setShowAddStockForm(true) }} />
            </header>

            {/* Main Section */}
            <section className="dashboard-content animate-slideUp">
              <h2 className="dashboard-greeting">
                Welcome back, {user.firstName || user.name} 👋
              </h2>
              {showOrderForm ? ( // if condition 
                <CreateOrderForm Onclose={() => setShowOrderForm(false)} />
              ) : showAllOrders ? ( // else if block
                <FullOrderTable onClose={() => setShowAllOrders(false)} />
              ) : ShowAddStockForm ? (
                <AddStockTogglePanel onClose={() => { setShowAddStockForm(false) }} />
              ) : (
                <>
                  <OrderSummary ViewAllOrders={() => { setShowAllOrders(true) }} />
                  <ProductStats onStatClick={handleStatFilter}/> 
                  {statFilter && (
                    <FilteredProductTable
                      title={statFilter}
                      data={filteredProducts}
                      onClose={() => {
                        setStatFilter(null);
                        setFilteredProducts([]);
                      }}
                    />
                  )}
                </>
              )
              }

            </section>

            {/* Dashboard Footer with buttons */}
            <DashboardFooter
              onChangePassword={() => setShowPasswordModal(true)}
              onDeleteAccount={() => console.log("Handle delete")}
            />
          </div>
        </main>

        {/* Modal for changing password */}
        {showPasswordModal && (
          <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboardcompo;
