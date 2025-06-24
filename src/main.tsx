import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/styles/animation.css';
import '@/styles/global.css';
import '@/styles/theme.css';

import App from './App.tsx';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
