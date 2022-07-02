import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppContainer } from './containers/AppContainer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (!Array.isArray(JSON.parse(window.localStorage.getItem('cat') as string))) {
  window.localStorage.setItem(
    'cat',
    JSON.stringify([
      { id: '868077t', name: 'Bartolomeu', breed: 'Siamês' },
      { id: 'st1v6wy', name: 'Tapioca', breed: 'Persa' },
      { id: '8a4chfr', name: 'Chico', breed: 'Rajado' }
    ])
  );
}

if (!Array.isArray(JSON.parse(window.localStorage.getItem('dog') as string))) {
  window.localStorage.setItem(
    'dog',
    JSON.stringify([
      { id: 'bnlg85k', name: 'Batata', breed: 'Pug' },
      { id: 'gf5b856', name: 'Oswaldo', breed: 'Caramelo' }
    ])
  );
}

root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);
