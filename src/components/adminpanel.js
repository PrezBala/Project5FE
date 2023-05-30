import React, { useState, useEffect } from 'react';
import { API } from '../api-service';  
import { useCookies } from 'react-cookie';
import './adminpanel.css'; 

function AdminPanel() {
  const [token] = useCookies(['mr-token']);
  const [usersData, setUsersData] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await API.getUsers(token['mr-token']);
        setUsersData(users);
        setUsersLoading(false);
      } catch (error) {
        setUsersError(error.message);
        setUsersLoading(false);
      }
    }

    fetchUsers();
  }, [token]);

  const deleteUser = (userId) => {
    API.deleteUser(userId, token['mr-token']).then(() => window.location.reload());
  }

  if (usersLoading) return <h1>Loading...</h1>;
  if (usersError) return <h1>Error loading users: {usersError}</h1>;

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <section className="section">
        <h2>Users</h2>
        {usersData.map((user) => (
          <div key={user.id} className="item">
            <p className="item-detail">{user.username}</p>
            <button className="item-button" onClick={() => deleteUser(user.id)}>Delete {user.username}</button>
          </div>
        ))}
      </section>

      {/* Rest of the component */}
    </div>
  );
}

export default AdminPanel;
