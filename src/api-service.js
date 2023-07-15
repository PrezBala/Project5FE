export class API {

    
    static async getUser(userId, token) {
        const response = await fetch(`https://project-5-movierater.herokuapp.com/api/users/${userId}/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}` 
          }
        });
        return response.json();
      }
      

    static async loginUser(body) {
        const response = await fetch(`https://project-5-movierater.herokuapp.com/api/users/login/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });
        const resp = await response.json();
        document.cookie = `mr-userid=${resp.user_id}; path=/`;
        return resp;
    }
    
  
    static async registerUser(body) {
      const response = await fetch(`https://project-5-movierater.herokuapp.com/api/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      return response.json();
    }
  
    static async getMovies(token) {
      const response = await fetch("https://project-5-movierater.herokuapp.com/api/movies/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}` 
        }
      });
      return response.json();
    }
    
    static async updateMovie(mov_id, body, token) {
      const response = await fetch(`https://project-5-movierater.herokuapp.com/api/movies/${mov_id}/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(body)
      });
      return response.json();
    }
  
    static async createMovie(body, token) {
      const response = await fetch(`https://project-5-movierater.herokuapp.com/api/movies/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        },
        body: JSON.stringify(body)
      });
      return response.json();
    }
  
    static async deleteMovie(mov_id, token) {
      await fetch(`https://project-5-movierater.herokuapp.com/api/movies/${mov_id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
    }
  }
  