import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import Auth from './components/auth';
import AdminPanel from './components/adminpanel'; 
import reportWebVitals from './reportWebVitals';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

function Router() {
  return (
    <React.StrictMode>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/movies/*" element={<App />} /> {/* Changed this line */}
            <Route path="/admin" element={<AdminPanel />} /> 
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </React.StrictMode>
  );
}

createRoot(document.getElementById('root')).render(<Router />); 

reportWebVitals();
