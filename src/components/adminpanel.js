import React, { useState, useEffect } from 'react';
import { API } from '../api-service';  
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './adminpanel.css'; 

function AdminPanel() {
  const [token] = useCookies(['mr-token']);
  const [usersData, setUsersData] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [moviesLoading, setMoviesLoading] = useState(true);
  const [usersError, setUsersError] = useState(null);
  const [moviesError, setMoviesError] = useState(null);
  const navigate = useNavigate();

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

    async function fetchMovies() {
      try {
        const movies = await API.getMovies(token['mr-token']);
        setMoviesData(movies);
        setMoviesLoading(false);
      } catch (error) {
        setMoviesError(error.message);
        setMoviesLoading(false);
      }
    }

    fetchUsers();
    fetchMovies();
  }, [token]);

  const deleteUser = async (userId) => {
    await API.deleteUser(userId, token['mr-token']);
    window.location.reload();
  }

  const deleteMovie = async (movieId) => {
    await API.deleteMovie(movieId, token['mr-token']);
    window.location.reload();
  }

  const goBack = () => {
    navigate(-1);
  }

  if (usersLoading || moviesLoading) return <h1>Loading...</h1>;
  if (usersError) return <h1>Error loading users: {usersError}</h1>;
  if (moviesError) return <h1>Error loading movies: {moviesError}</h1>;

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <button onClick={goBack}>Back</button>

      <section className="section">
        <h2>Users</h2>
        {usersData.map((user) => (
          <div key={user.id} className="item">
            <p className="item-detail">{user.username}</p>
            <button className="item-button" onClick={() => deleteUser(user.id)}>Delete {user.username}</button>
          </div>
        ))}
      </section>

      <section className="section">
        <h2>Movies</h2>
        {moviesData.map((movie) => (
          <div key={movie.id} className="item">
            <p className="item-detail">{movie.title}</p>
            <button className="item-button" onClick={() => deleteMovie(movie.id)}>Delete {movie.title}</button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default AdminPanel;
