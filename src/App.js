import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import { useFetch } from './hooks/useFetch';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Movie1 = "/images/avatarr.jpeg";
const Movie2 = "/images/avengers.jpg";
const Movie3 = "/images/flash.jpg";
const Movie4 = "/images/harry.jpg";
const Movie5 = "/images/mario.jpg";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token, setToken, deleteToken] = useCookies(['mr-token']);
  const [data, loading, error] = useFetch();

  useEffect(() => {
    setMovies(data);
  }, [data]);

  useEffect(() => {
    if (!token['mr-token']) window.location.href = '/';
  }, [token]);

  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  };

  const editClicked = movie => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  };

  const updatedMovie = movie => {
    const newMovies = movies.map(mov => (mov.id === movie.id ? movie : mov));
    setMovies(newMovies);
  };

  const newMovie = () => {
    setEditedMovie({ title: '', description: '' });
    setSelectedMovie(null);
  };

  const movieCreated = movie => {
    const newMovies = [...movies, movie];
    setMovies(newMovies);
  };

  const removeClicked = movie => {
    const newMovies = movies.filter(mov => mov.id !== movie.id);
    setMovies(newMovies);
  };

  const logoutUser = () => {
    deleteToken(['mr-token']);
  };

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error loading movies</h1>;
  if (movies['detail'] === 'Invalid token.') {
    logoutUser();
    return <h1>Wrong credentials, please refresh and try again</h1>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm} />
          <span>Movie rater</span>
        </h1>
        <div onClick={logoutUser} className="logout-button"> 
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Log out</span> 
        </div>
      </header>

      <Carousel autoPlay infiniteLoop useKeyboardArrows dynamicHeight showThumbs={false}>
        <div>
            <img src={Movie1} alt="Movie 1" className="carousel-image" />
            <p className="legend">Legend 1</p>
        </div>
        <div>
            <img src={Movie2} alt="Movie 2" className="carousel-image" />
            <p className="legend">Legend 2</p>
        </div>
        <div>
            <img src={Movie3} alt="Movie 3" className="carousel-image" />
            <p className="legend">Legend 3</p>
        </div>
      </Carousel>

      <div className="layout">
        <div>
          <MovieList
            movies={movies}
            movieClicked={loadMovie}
            editClicked={editClicked}
            removeClicked={removeClicked}
          />
          <button onClick={newMovie}>New movie</button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie} />
        {editedMovie ? (
          <MovieForm
            movie={editedMovie}
            updatedMovie={updatedMovie}
            movieCreated={movieCreated}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
