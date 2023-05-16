import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from './components/auth';
import reportWebVitals from './reportWebVitals';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

function Router(){
  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Auth />} />
          <Route exact path="/movies" element={<App />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  )
}

ReactDOM.render(<Router />, document.getElementById('root'));

reportWebVitals();
