import './Dashboards.css';
import formatDate from '../Utility/DateFormatChanger';

const UserProfilecompo = ({ user, CreateorderProp, ShowAddStock }) => {
  if (!user) return null;
  return (
    <div className="profile-card">
      
      <div className="profile-details">
        <h2 className="username">{user.name}</h2>
        <p className="email"><i className="fas fa-envelope"></i> {user.email}</p>
        <p className="email"><i className="fas fa-phone-alt"></i> {user.mobile}</p>
        <p className="email"><i className="fas fa-store"></i> {user.shopName}</p>
        <p className="joined"><i className="fas fa-calendar-alt"></i> Joined {formatDate(user.createdAt)}</p>
      </div>
     <a href="/user/editprofile">
       <button className="edit-btn" >
        <i className="fas fa-user-edit"></i>  Edit Profile
      </button>
     </a>
      <button className="edit-btn" onClick={CreateorderProp}>
        <i className="fa fa-file-invoice"></i>  Create Order
      </button>

        <button className="edit-btn" onClick={ShowAddStock}>
        <i className="fas fa-box-open"></i>  Add Stock
      </button>

    </div>
  );
};

export default UserProfilecompo;
