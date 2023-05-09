import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [movies, setMovies] = useState([]);

  useEffect(()=>{
    fetch("https://8000-prezbala-project5api-nox8rqq7d9l.ws-eu96b.gitpod.io/api/movies/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token 1585932fbeb3f2384cd08c6fe9438600f96e51fa'
        }
    })
    .then( resp => resp.json())
    .then( resp => setMovies(resp))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Rater</h1>
      </header>
      <div className="layout">
        <div>
          { movies.map( movie => {
            return <h2> {movie}</h2>
          })}
        </div>
        <div>Movie details</div>
      </div>
    </div>
  );
}

export default App;
