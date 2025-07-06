const UserInfocompo = ({ user }) => (
  <div className="bg-gray-800 p-4 rounded-xl shadow-md text-white mb-4">
    <h3 className="text-lg font-semibold">Welcome, {user.name}</h3>
    <p>Role: {user.role}</p>
    <p>Shop: {user.shopName}</p>
    <p>Last login: {user.lastLogin}</p>
  </div>
);

export default UserInfocompo;
