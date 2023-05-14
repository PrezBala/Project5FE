import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);

  useEffect(()=>{
    fetch("https://8000-prezbala-project5api-nox8rqq7d9l.ws-eu97.gitpod.io/api/movies/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 1585932fbeb3f2384cd08c6fe9438600f96e51fa'
        }
    })
    .then( resp => resp.json())
    .then( resp => setMovies(resp))
    .catch( error => console.log(error))

  }, [])

  const movieClicked = movie => {
    setSelectedMovie(movie);
  }

  const loadMovie = movie => {
    setSelectedMovie(movie);

  }

  const editClicked = movie => {
    setEditedMovie(movie);

  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
      </header>
      <div className="layout">
        <MovieList movies={movies} movieClicked={movieClicked} editClicked={editClicked}/>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
        <MovieForm movie ={editedMovie} />
      </div>
    </div>
  );
}

export default App;
