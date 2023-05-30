import React from 'react';
import { useFetch } from '../hooks/useFetch';  

function AdminPanel() {
  const [usersData, usersLoading, usersError] = useFetch('/api/users');
  const [moviesData, moviesLoading, moviesError] = useFetch('/api/movies');

  if (usersLoading || moviesLoading) return <h1>Loading...</h1>;
  if (usersError) return <h1>Error loading users: {usersError}</h1>;
  if (moviesError) return <h1>Error loading movies: {moviesError}</h1>;

  return (
    <div>
      <h1>Admin Panel</h1>

      <h2>Users</h2>
      {usersData.map((user) => (
        <div key={user.id}>
          <p>{user.name}</p>
          {/* Additional user information and controls here */}
        </div>
      ))}

      <h2>Movies</h2>
      {moviesData.map((movie) => (
        <div key={movie.id}>
          <p>{movie.title}</p>
          {/* Additional movie information and controls here */}
        </div>
      ))}
    </div>
  );
}

export default AdminPanel;
