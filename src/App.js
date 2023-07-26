import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import AdminPanel from './components/adminpanel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilm, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';
import { useFetch } from './hooks/useFetch';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Route, Routes } from 'react-router-dom';

const Movie1 = "/images/batman.png";
const Movie2 = "/images/harry.jpg";
const Movie3 = "/images/it.png";

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token, /* setToken */, deleteToken] = useCookies(['mr-token']);
  const [isStaff, /* setIsStaff */, deleteStaff] = useCookies(['is-staff']); 
  const [data, loading, error] = useFetch();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(()=>{
    setMovies(data);
  }, [data])

  useEffect(() => {
    if (!token['mr-token']) {
      setIsLoggedIn(false);
      if (sessionStorage.getItem('loginAttempted')) {
        window.location.href = '/';
      }
    } else {
      sessionStorage.setItem('loginAttempted', 'true');
      setIsLoggedIn(true);
    }
  }, [token])

  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
    updatedMovie(movie)
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
    deleteStaff(['is-staff']);
    sessionStorage.removeItem('loginAttempted');
    setIsLoggedIn(false);
  };

  if (loading) return <div className="full-screen-message"><h1>Loading...</h1></div>;
  if (error) return <div className="full-screen-message"><h1>Error loading movies</h1></div>;
  if (movies['detail'] === 'Invalid token.' && isLoggedIn) {
    logoutUser();
    return <h1>Wrong credentials, please refresh and try again</h1>;
  }
  if (!isLoggedIn && sessionStorage.getItem('loginAttempted')) {
    return <h1>Wrong credentials, please refresh and try again</h1>;
  }
  if (!isLoggedIn && !sessionStorage.getItem('loginAttempted')) {
    return <h1>You are logged out!</h1>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm} />
          <span>FlickRater</span>
        </h1>
        <div onClick={logoutUser} className="logout-button">
          <FontAwesomeIcon icon={faSignOutAlt} />
          <span>Log out</span>
        </div>
        {isStaff['is-staff'] === 'true' ? (
          <div className="admin-section" onClick={() => window.location.href = '/admin'}>
            <span>Admin Section</span>
          </div>
        ) : null}
        <div className="welcome-message login-message">You are now logged in</div>
      </header>

      <div className="carousel-container">
        <Carousel autoPlay infiniteLoop useKeyboardArrows dynamicHeight showThumbs={false}>
          <div>
            <img src={Movie1} alt="Movie 1" className="carousel-image" />
            <p className="legend">Batman</p>
          </div>
          <div>
            <img src={Movie2} alt="Movie 2" className="carousel-image" />
            <p className="legend">Harry Potter and the Philosopher&apos;s Stone</p>
          </div>
          <div>
            <img src={Movie3} alt="Movie 3" className="carousel-image" />
            <p className="legend">IT Chapter 2</p>
          </div>
        </Carousel>
      </div>

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

      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>

      <footer className="App-footer">
        <div className="footer-content">
          <p>Created by Prasena Balachandran</p>
          <p>Project 5</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
