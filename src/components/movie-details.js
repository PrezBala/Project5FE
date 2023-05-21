import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useCookies } from 'react-cookie';

function MovieDetails(props) {
  const [highlighted, setHighlighted] = useState(-1);
  const [token] = useCookies(['mr-token']);

  const mov = props.movie;

  const highlightRate = (high) => (evt) => {
    setHighlighted(high);
  };

  const rateClicked = (rate) => (evt) => {
    fetch(`https://8000-prezbala-project5api-onll2lfd0l.us2.codeanyapp.com/api/movies/${mov.id}/rate_movie/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mr-token']}`
      },
      body: JSON.stringify({ stars: rate + 1 })
    })
      .then(() => getDetails())
      .catch((error) => console.log(error));
  };

  const getDetails = () => {
    fetch(`https://8000-prezbala-project5api-onll2lfd0l.us2.codeanyapp.com/api/movies/${mov.id}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mr-token']}`
      }
    })
      .then((resp) => resp.json())
      .then((resp) => props.updateMovie(resp))
      .catch((error) => console.log(error));
  };

  return (
    <React.Fragment>
      {mov ? (
        <div>
          <div className="movie-header">
            <h1>{mov.title}</h1>
            <div className="movie-rating">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={(mov.avg_rating > i) ? 'orange' : ''}
                />
              ))}
              ({mov.no_of_ratings})
            </div>
          </div>
          <p>{mov.description}</p>
          <div className="rate-container">
            <h2>Rate it</h2>
            <div className="movie-user-rating">
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={highlighted > i - 1 ? 'purple' : ''}
                  onMouseEnter={highlightRate(i)}
                  onMouseLeave={highlightRate(-1)}
                  onClick={rateClicked(i)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
}

export default MovieDetails;
