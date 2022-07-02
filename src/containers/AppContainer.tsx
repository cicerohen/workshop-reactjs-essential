import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomeViewContainer } from './views/HomeViewContainer';
import { CatsViewContainer } from './views/CatsViewContainer';
import { DogsViewContainer } from './views/DogsViewContainer';
export const AppContainer = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeViewContainer />} />
        <Route path="/cats" element={<CatsViewContainer />} />
        <Route path="/dogs" element={<DogsViewContainer />} />
      </Routes>
    </BrowserRouter>
  );
};
