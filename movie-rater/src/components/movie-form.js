import React from 'react';

function MovieForm(props) {
    return (
        <React.Fragment>
            { props.movie ? (
            <div>
                <label for="title">Title</label><br/>
                <input id="title" type="text" placeholder="title" /><br/>
                <label for="description">Description</label><br/>
                <textarea id="description"type="text" placeholder="Description"></textarea><br/>
            </div>
            ) : null }
        </React.Fragment>
    )
}

export default MovieForm;