import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import './styles/authBackground.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/autos-gestion">
      <App />
    </BrowserRouter>
  </StrictMode>
);