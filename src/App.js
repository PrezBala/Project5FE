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

import Movie1 from '/workspaces/Project5FE/public/images/moviereel.jpeg';
import Movie2 from '/workspaces/Project5FE/public/images/moviereel.jpeg';
import Movie3 from '/workspaces/Project5FE/public/images/moviereel.jpeg';

function App() {
  // your code here...

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

      <Carousel autoPlay infiniteLoop useKeyboardArrows dynamicHeight>
        <div>
            <img src={Movie1} alt="Movie 1" />
            <p className="legend">Legend 1</p>
        </div>
        <div>
            <img src={Movie2} alt="Movie 2" />
            <p className="legend">Legend 2</p>
        </div>
        <div>
            <img src={Movie3} alt="Movie 3" />
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
