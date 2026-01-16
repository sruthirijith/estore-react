import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Global template styles (copied from estore-frontend/assets/css)
import './assets/css/bootstrap.min.css';
import './assets/css/LineIcons.3.0.css';
import './assets/css/tiny-slider.css';
import './assets/css/glightbox.min.css';
import './assets/css/auth.css';
import './assets/css/main.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);