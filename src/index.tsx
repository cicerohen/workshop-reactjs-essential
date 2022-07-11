import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppContainer } from './containers/AppContainer';
import {
  getPetsFromLocalStorage,
  setPetsToLocalStorage
} from './hooks/usePets';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

if (getPetsFromLocalStorage('cats').size === 0) {
  const cats = new Map();
  cats.set('868077t', { id: '868077t', name: 'Bartolomeu', breed: 'Siamês' });
  cats.set('st1v6wy', { id: 'st1v6wy', name: 'Tapioca', breed: 'Persa' });
  cats.set('8a4chfr', { id: '8a4chfr', name: 'Chico', breed: 'Rajado' });
  setPetsToLocalStorage('cats', cats);
}

if (getPetsFromLocalStorage('dogs').size === 0) {
  const dogs = new Map();
  dogs.set('bnlg85k', { id: 'bnlg85k', name: 'Batata', breed: 'Pug' });
  dogs.set('gf5b856', { id: 'gf5b856', name: 'Oswaldo', breed: 'Caramelo' });

  setPetsToLocalStorage('dogs', dogs);
}

root.render(
  <React.StrictMode>
    <AppContainer />
  </React.StrictMode>
);
