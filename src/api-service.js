export class API {

    static async loginUser(body) {
      const response = await fetch(`https://8000-prezbala-project5api-g8tw0q6j1r.us2.codeanyapp.com/auth/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });
      return response.json();
    }
  
    static async registerUser(body) {
      const response = await fetch(`https://8000-prezbala-project5api-g8tw0q6j1r.us2.codeanyapp.com/api/users/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      return response.json();
    }
  
    static async getMovies(token) {
      const response = await fetch("https://8000-prezbala-project5api-g8tw0q6j1r.us2.codeanyapp.com/api/movies/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}` 
        }
      });
      return response.json();
    }
    
    static async updateMovie(mov_id, body, token) {
      const response = await fetch(`https://8000-prezbala-project5api-g8tw0q6j1r.us2.codeanyapp.com/api/movies/${mov_id}/`, {
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
      const response = await fetch(`https://8000-prezbala-project5api-g8tw0q6j1r.us2.codeanyapp.com/api/movies/`, {
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
      await fetch(`https://8000-prezbala-project5api-g8tw0q6j1r.us2.codeanyapp.com/api/movies/${mov_id}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`
        }
      });
    }
  }
  