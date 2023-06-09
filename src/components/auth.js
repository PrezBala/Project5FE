import React, { useState, useEffect } from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';
import './Auth.css';

function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);

  const [token, setToken, , setUserId] = useCookies(['mr-token', 'mr-userid']);  // Add 'mr-userid' here
  const [isStaff, setIsStaff] = useCookies(['is-staff']);  // Keep this line as is
  
  useEffect(() => {
    if (token['mr-token']) window.location.href = '/movies';
  }, [token]);

  const loginClicked = () => {
    API.loginUser({username, password})
        .then( resp => {
            console.log('Server response:', resp);  // Log the full response
            setToken('mr-token', resp.token);
            setIsStaff('is-staff', resp.is_staff);  // Set the 'is-staff' cookie
            setUserId('mr-userid', resp.user_id); // Assume resp.user_id is the user id from server response.
            console.log('Cookie is_staff:', isStaff['is-staff']);  // Log the 'is-staff' cookie value
            console.log('Document cookie:', document.cookie);  // Log all cookies
        })
        .catch( error => console.log(error))
  }

  
  

  const registerClicked = () => {
    API.registerUser({ username, password })
      .then(() => loginClicked())
      .catch((error) => console.log(error));
  };

  const isDisabled = username.length === 0 || password.length === 0;

  return (
    <div className="Auth">
      <header className="Auth-header">
        {isLoginView ? <h1>FlickRater Login</h1> : <h1>FlickRater Register</h1>}
      </header>
      <div className="login-container">
        <label htmlFor="username">Username</label>
        <br />
        <input
          id="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
        />
        <br />
        <label htmlFor="password">Password</label>
        <br />
        <input
          id="password"
          type="password"
          placeholder="Description"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <br />
        {isLoginView ? (
          <button onClick={loginClicked} disabled={isDisabled}>
            Login
          </button>
        ) : (
          <button onClick={registerClicked} disabled={isDisabled}>
            Register
          </button>
        )}

        {isLoginView ? (
          <p onClick={() => setIsLoginView(false)}>
            You don't have an account? Register here!
          </p>
        ) : (
          <p onClick={() => setIsLoginView(true)}>
            You already have an account? Login here
          </p>
        )}
      </div>
    </div>
  );
}

export default Auth;