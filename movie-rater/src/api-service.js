const TOKEN = "1585932fbeb3f2384cd08c6fe9438600f96e51fa";

export class API {

    static loginUser(body) {
        return fetch(`https://8000-prezbala-project5api-nox8rqq7d9l.ws-eu97.gitpod.io/auth/`, {
          method: 'POST',
          headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify( body )
          }) .then( resp => resp.json())
      }

    static updateMovie(mov_id, body) {
      return fetch(`https://8000-prezbala-project5api-nox8rqq7d9l.ws-eu97.gitpod.io/api/movies/${mov_id}/`, {
        method: 'PUT',
        headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            },
            body: JSON.stringify( body )
        }) .then( resp => resp.json())
    }

    static createMovie(body) {
        return fetch(`https://8000-prezbala-project5api-nox8rqq7d9l.ws-eu97.gitpod.io/api/movies/`, {
          method: 'POST',
          headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${TOKEN}`
              },
              body: JSON.stringify( body )
          }) .then( resp => resp.json())
      }

    static deleteMovie(mov_id) {
        return fetch(`https://8000-prezbala-project5api-nox8rqq7d9l.ws-eu97.gitpod.io/api/movies/${mov_id}/`, {
          method: 'DELETE',
          headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${TOKEN}`
              }
          }) 
      }
}
