import { createContext, useContext, useEffect, useState } from 'react';

import { getFavoritePetsFromLocalStorage } from '../hooks/useFavoritePets';

import { PetsMap, RCProps } from '../types';

type FavoritePetsContext = {
  favoriteCats: PetsMap;
  setFavoriteCats: (pets: PetsMap) => void;
};

type Props = RCProps;

const Context = createContext<FavoritePetsContext>({} as FavoritePetsContext);

export const FavoriteCatsProvider = ({ children }: Props) => {
  const [favoriteCats, setFavoriteCats] = useState<PetsMap>(
    getFavoritePetsFromLocalStorage('cats')
  );
  const value = {
    favoriteCats,
    setFavoriteCats
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useFavoriteCatsContext = () => useContext(Context);
