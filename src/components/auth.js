import React, { useState, useEffect } from 'react';
import { API } from '../api-service';
import { useCookies } from 'react-cookie';
import './Auth.css';

function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginView, setIsLoginView] = useState(true);

  const [token, setToken, , setUserId] = useCookies(['mr-token', 'mr-userid']); 
  const [setIsStaff] = useCookies(['is-staff']); 
  
  useEffect(() => {
    if (token['mr-token']) window.location.href = '/movies';
  }, [token]);

  const loginClicked = () => {
    API.loginUser({username, password})
        .then( resp => {
            setToken('mr-token', resp.token);
            setIsStaff('is-staff', resp.is_staff);  
            setUserId('mr-userid', resp.user_id);
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
        <h1>FlickRater</h1>
      </header>
      <div className="login-container">
        <div className="input-container">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={(evt) => setUsername(evt.target.value)}
          />
        </div>
        <div className="input-container">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Description"
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </div>

        <div className="input-container">
          {isLoginView ? (
            <button onClick={loginClicked} disabled={isDisabled}>
              Login
            </button>
          ) : (
            <button onClick={registerClicked} disabled={isDisabled}>
              Register
            </button>
          )}
        </div>

        <div className="input-container">
          {isLoginView ? (
            <p onClick={() => setIsLoginView(false)}>
              You don&apos;t have an account? Register here!
            </p>
          ) : (
            <p onClick={() => setIsLoginView(true)}>
              You already have an account? Login here
            </p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Auth;
