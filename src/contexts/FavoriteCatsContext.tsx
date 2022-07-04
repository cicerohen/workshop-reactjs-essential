import { createContext, useContext } from 'react';
import { useFavoritePets } from '../hooks/useFavoritePets';

import { RCProps } from '../types';

type FavoritePetsContext = {
  favoriteCats: ReturnType<typeof useFavoritePets>['favoritePets'];
  favoriteCat: ReturnType<typeof useFavoritePets>['favoritePet'];
  unFavoriteCat: ReturnType<typeof useFavoritePets>['unFavoritePet'];
  unFavoriteCats: ReturnType<typeof useFavoritePets>['unFavoritePets'];
};

type Props = RCProps;

const Context = createContext<FavoritePetsContext>({} as FavoritePetsContext);

export const FavoriteCatsProvider = ({ children }: Props) => {
  const {
    favoritePets: favoriteCats,
    favoritePet: favoriteCat,
    unFavoritePet: unFavoriteCat,
    unFavoritePets: unFavoriteCats
  } = useFavoritePets('cat');

  const value: FavoritePetsContext = {
    favoriteCats,
    favoriteCat,
    unFavoriteCat,
    unFavoriteCats
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useFavoriteCatsContext = () => useContext(Context);
