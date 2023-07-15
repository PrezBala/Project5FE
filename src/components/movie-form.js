import React, {useState, useEffect }from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';
import PropTypes from 'prop-types';

function MovieForm(props) {

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [token] = useCookies(['mr-token']);

    useEffect( () => {
        setTitle(props.movie.title);
        setDescription(props.movie.description);
      }, [props.movie])

    const updateClicked = () => {
        API.updateMovie(props.movie.id, {title, description},token['mr-token'])
        .then( resp => props.updatedMovie(resp))
        .catch( error => console.log(error))
      }

    const createClicked = () => {
        API.createMovie({title, description},token['mr-token'])
        .then( resp => props.movieCreated(resp))
        .catch( error => console.log(error))
      }

    const isDisabled = title.length === 0 || description.length === 0;  

    return (
        <React.Fragment>
            { props.movie ? (
            <div>
                <label htmlFor="title">Title</label><br/>
                <input id="title" type="text" placeholder="title - do not exceed 32 characters" value={title}
                    onChange={ evt=> setTitle(evt.target.value)}
                /><br/>
                <label htmlFor="description">Description</label><br/>
                <textarea id="description"type="text" placeholder="Description - do not exceed 32 characters" value={description}
                    onChange={ evt=> setDescription(evt.target.value)}
                ></textarea><br/>
                {  props.movie.id ?
                    <button onClick={updateClicked} disabled={isDisabled}>Update</button> : 
                    <button onClick={createClicked} disabled={isDisabled}>Create</button>
                }

            </div>
            ) : null }
        </React.Fragment>
    )
}

MovieForm.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  updatedMovie: PropTypes.func.isRequired,
  movieCreated: PropTypes.func.isRequired
};

export default MovieForm;
