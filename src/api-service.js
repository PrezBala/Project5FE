export class API {

  
  static deleteUser(user_id, token) {
    return fetch(`https://project-5-movierater.herokuapp.com/api/users/${user_id}/`, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Token ${token}`
        }
    });
  }  

  static loginUser(body) {
    return fetch(`https://project-5-movierater.herokuapp.com/auth/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json());
  }

  static registerUser(body) {
    return fetch(`https://project-5-movierater.herokuapp.com/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( body )
    }).then( resp => resp.json())
  }

  static getMovies(token){
    return fetch("https://project-5-movierater.herokuapp.com/api/movies/", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}` 
      }
    }).then( resp => resp.json())
  }
  
  static updateMovie(mov_id, body, token) {
    return fetch(`https://project-5-movierater.herokuapp.com/api/movies/${mov_id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json());
  }

  static createMovie(body, token) {
    return fetch(`https://project-5-movierater.herokuapp.com/api/movies/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      },
      body: JSON.stringify(body)
    }).then(resp => resp.json());
  }

  static deleteMovie(mov_id, token) {
    return fetch(`https://project-5-movierater.herokuapp.com/api/movies/${mov_id}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`
      }
    });
  }
}
