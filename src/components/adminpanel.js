import React, { useState, useEffect } from 'react';
import { API } from '../api-service';  
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import './adminpanel.css'; 

function AdminPanel() {
  const [token] = useCookies(['mr-token']);
  const [userId] = useCookies(['mr-userid']);
  const [isAdmin, setIsAdmin] = useState(false);
  const [moviesData, setMoviesData] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(true);
  const [moviesError, setMoviesError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.getUser(userId['mr-userid'], token['mr-token'])
        setIsAdmin(response.is_staff);
        if (!response.is_staff) {
          navigate('/');
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();

    const fetchMovies = async () => {
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
  }, [token, userId, navigate]);

  const deleteMovie = async (movieId) => {
    await API.deleteMovie(movieId, token['mr-token']);
    window.location.reload();
  }

  const goBack = () => {
    navigate(-1);
  }

  if (!isAdmin) {
    return null;
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
      <footer className="App-footer">
        <div className="footer-content">
          <p>Created by Prasena Balachandran</p>
          <p>Project 5</p>
        </div>
      </footer>
    </div>
  );
}

export default AdminPanel;
