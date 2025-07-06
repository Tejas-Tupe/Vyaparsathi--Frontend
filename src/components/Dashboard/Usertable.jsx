import './Dashboards.css';

const UserTable = () => {
  const dummyUsers = [
    { name: 'Tejas Tupe', email: 'tejas@gmail.com', role: 'Admin' },
    { name: 'Riya Singh', email: 'riya@vyaparsathi.com', role: 'User' },
    { name: 'Yash Patil', email: 'yash@vyaparsathi.com', role: 'Manager' },
    { name: 'Nisha Mehra', email: 'nisha@vyaparsathi.com', role: 'User' },
  ];

  return (
    <div className="user-table-wrapper">
      <h3 className="table-title">👥 All Users</h3>
      <table className="user-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {dummyUsers.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td><span className={`role-pill ${user.role.toLowerCase()}`}>{user.role}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
