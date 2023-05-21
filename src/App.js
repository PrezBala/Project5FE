import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/movie-list';
import MovieDetails from './components/movie-details';
import MovieForm from './components/movie-form';
import { useCookies } from 'react-cookie';

function App() {

  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token] = useCookies(['mr-token']);

  useEffect(()=>{
    fetch("https://8000-prezbala-project5api-onll2lfd0l.us2.codeanyapp.com/api/movies/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token['mr-token']}`
        }
    })
    .then( resp => resp.json())
    .then( resp => setMovies(resp))
    .catch( error => console.log(error))

  }, [])

  useEffect( () => {
    console.log(token);
    if(!token['mr-token']) window.location.href = '/';
  }, [token])



  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);

  }

  const editClicked = movie => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  }

  const updatedMovie = movie => {
    const newMovies = movies.map( mov => {
      if (mov.id === movie.id) {
        return movie;
      }
      return mov;
    })
    setMovies(newMovies)
  }
  const newMovie = () => {
    setEditedMovie({title: '', description: ''});
    setSelectedMovie(null);
  }

  const movieCreated = movie => {
    const newMovies = [...movies, movie];
    setMovies(newMovies);
  }

  const removeClicked = movie => {
    const newMovies = movies.filter( mov => mov.id !== movie.id);
    setMovies(newMovies);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
      </header>
      <div className="layout">
        <div>
          <MovieList 
            movies={movies} 
            movieClicked={loadMovie} 
            editClicked={editClicked}
            removeClicked={removeClicked}
            />
          <button onClick={ newMovie}>New Movie</button>
        </div>
        <MovieDetails movie={selectedMovie} updateMovie={loadMovie}/>
        { editedMovie ? 
        <MovieForm movie ={editedMovie} updatedMovie={updatedMovie} movieCreated={movieCreated} /> 
        : null }

      </div>
    </div>
  );
}

export default App;