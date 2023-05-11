import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { faCoffee } from '@fortawesome/free-solid-svg-icons'


function MovieDetails(props){


    return (
        <div>
            { props.movie ? (
                <div>
                    <h1>{props.movie && props.movie.title}</h1>
                    <p>{props.movie && props.movie.description}</p>
                    <FontAwesomeIcon icon={faCoffee} />
                </div>
            ) : null }

        </div> 
    )
}
  
  export default MovieDetails;