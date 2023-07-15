import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';

function MovieList(props) {
  const [token] = useCookies(['mr-token']);
  const [userId] = useCookies(['mr-userid']);

  useEffect(() => {
    console.log('User ID:', userId['mr-userid']);
  }, [userId]); 

  const movieClicked = movie => () => {
    props.movieClicked(movie);
  };

  const editClicked = movie => {
    props.editClicked(movie);
  };

  const removeClicked = movie => {
    API.deleteMovie(movie.id, token['mr-token'])
      .then(() => props.removeClicked(movie))
      .catch(() => console.log());
  };

  return (
    <div className="movie-list-container">
      {props.movies &&
        props.movies.map(movie => {
          return (
            <div key={movie.id} className="movie-item">
              <h2 onClick={movieClicked(movie)}>{movie.title}</h2>
              {parseInt(userId['mr-userid']) === movie.creator && (
                <>
                  <FontAwesomeIcon icon={faEdit} onClick={() => editClicked(movie)} />
                  <FontAwesomeIcon icon={faTrash} onClick={() => removeClicked(movie)} />
                </>
              )}
            </div>
          );
        })}
    </div>
  );
}

MovieList.propTypes = {
  movies: PropTypes.array,
  movieClicked: PropTypes.func.isRequired,
  editClicked: PropTypes.func.isRequired,
  removeClicked: PropTypes.func.isRequired
};

export default MovieList;
