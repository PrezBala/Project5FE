import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons'



function MovieDetails(props){


    return (
        <div>
            { props.movie ? (
                <div>
                    <h1>{props.movie && props.movie.title}</h1>
                    <p>{props.movie && props.movie.description}</p>
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 0 ? 'orange':'' } />
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 1 ? 'orange':'' } />
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 2 ? 'orange':'' } />
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 3 ? 'orange':'' } />
                    <FontAwesomeIcon icon={faStar} className={props.movie.avg_rating > 4 ? 'orange':'' } />
                    ({props.movie.no_of_ratings})
                </div>
            ) : null }

        </div> 
    )
}
  
  export default MovieDetails;