import React from 'react';
import { useFetch } from '../hooks/useFetch';  
import { API } from '../api-service';
import { useCookies } from 'react-cookie';
import '../components/'; // import the CSS file

function AdminPanel() {
  const [token] = useCookies(['mr-token']);
  const [usersData, usersLoading, usersError] = useFetch('/api/users');
  const [moviesData, moviesLoading, moviesError] = useFetch('/api/movies');

  const deleteUser = (userId) => {
    API.deleteUser(userId, token['mr-token']).then(() => window.location.reload());
  }

  if (usersLoading || moviesLoading) return <h1>Loading...</h1>;
  if (usersError) return <h1>Error loading users: {usersError}</h1>;
  if (moviesError) return <h1>Error loading movies: {moviesError}</h1>;

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>

      <section className="section">
        <h2>Users</h2>
        {usersData.map((user) => (
          <div key={user.id} className="item">
            <p className="item-detail">{user.name}</p>
            <button className="item-button" onClick={() => deleteUser(user.id)}>Delete {user.name}</button>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>Movies</h2>
        {moviesData.map((movie) => (
          <div key={movie.id} className="item">
            <p className="item-detail">{movie.title}</p>
            {/* Additional movie information and controls here */}
          </div>
        ))}
      </section>
    </div>
  );
}

export default AdminPanel;
