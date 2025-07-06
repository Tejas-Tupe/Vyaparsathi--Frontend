import './Dashboards.css'; 
import { FaKey, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';         
import { useNavigate } from 'react-router-dom'; 

const DashboardFooter = ({ onChangePassword }) => {

  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
  if (!window.confirm("Are you sure? This will permanently delete your account and all data.")) return;

  try {
    const token = localStorage.getItem('token');

    const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/users/deleteaccount`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Your account has been deleted.");
      localStorage.removeItem('token');
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 1500);
    } else {
      toast.error(data.error || "Deletion failed.");
    }
  } catch (err) {
    console.error("Delete error:", err);
    toast.error("Server error. Try again later.");
  }
};

  return (
    <div className="dashboard-footer">
      <button className="edit-btn" onClick={onChangePassword}>
        <FaKey /> Change Password
      </button>
      <button className="edit-btn" onClick={handleDeleteAccount}>
        <FaTrashAlt /> Delete Account
      </button>
    </div>
  );
};

export default DashboardFooter;
