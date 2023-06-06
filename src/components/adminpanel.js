import React, { useState, useEffect } from 'react';
import { API } from '../api-service';  
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './adminpanel.css'; 

function AdminPanel() {
  const [token] = useCookies(['mr-token']);
  const [moviesData, setMoviesData] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(true);
  const [moviesError, setMoviesError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchMovies();
  }, [token]);

  const deleteMovie = async (movieId) => {
    await API.deleteMovie(movieId, token['mr-token']);
    window.location.reload();
  }

  const goBack = () => {
    navigate(-1);
  }

  if (moviesLoading) return <h1>Loading...</h1>;
  if (moviesError) return <h1>Error loading movies: {moviesError}</h1>;

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <button onClick={goBack}>Back</button>

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
