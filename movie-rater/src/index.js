import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Auth from './components/auth';
import reportWebVitals from './reportWebVitals';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

export const TokenContext = createContext(null);

function Router() {
  const TOKEN = "1585932fbeb3f2384cd08c6fe9438600f96e51fa";
  
  return (
    <React.StrictMode>
      <TokenContext.Provider value={TOKEN}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/movies" element={<App />} />
          </Routes>
        </BrowserRouter>
      </TokenContext.Provider>
    </React.StrictMode>
  );
}

ReactDOM.render(<Router />, document.getElementById('root'));

reportWebVitals();
