import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomeViewContainer } from './views/HomeViewContainer';
import { CatsViewContainer } from './views/CatsViewContainer';
import { DogsViewContainer } from './views/DogsViewContainer';
import { FavoritePetsViewContainer } from './views/FavoritePetsViewContainer';

import { FavoriteCatsProvider } from '../contexts/FavoriteCatsContext';
import { FavoriteDogsProvider } from '../contexts/FavoriteDogsContext';

export const AppContainer = () => {
  return (
    <FavoriteCatsProvider>
      <FavoriteDogsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomeViewContainer />} />
            <Route path="/cats" element={<CatsViewContainer />} />
            <Route path="/dogs" element={<DogsViewContainer />} />
            <Route path="/favorites" element={<FavoritePetsViewContainer />} />
          </Routes>
        </BrowserRouter>
      </FavoriteDogsProvider>
    </FavoriteCatsProvider>
  );
};
