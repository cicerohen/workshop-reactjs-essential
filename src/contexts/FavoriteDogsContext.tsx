import { createContext, useContext, useEffect, useState } from 'react';

import { getFavoritePetsFromLocalStorage } from '../hooks/useFavoritePets';

import { PetsMap, RCProps } from '../types';

type FavoriteDogsContext = {
  favoriteDogs: PetsMap;
  setFavoriteDogs: (pets: PetsMap) => void;
};

type Props = RCProps;

const Context = createContext<FavoriteDogsContext>({} as FavoriteDogsContext);

export const FavoriteDogsProvider = ({ children }: Props) => {
  const [favoriteDogs, setFavoriteDogs] = useState<PetsMap>(
    getFavoritePetsFromLocalStorage('dogs')
  );
  const value = {
    favoriteDogs,
    setFavoriteDogs
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useFavoriteDogsContext = () => useContext(Context);
