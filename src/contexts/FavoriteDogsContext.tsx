import { createContext, useContext } from 'react';
import { useFavoritePets } from '../hooks/useFavoritePets';

import { RCProps } from '../types';

type FavoriteDogsContext = {
  favoriteDogs: ReturnType<typeof useFavoritePets>['favoritePets'];
  favoriteDog: ReturnType<typeof useFavoritePets>['favoritePet'];
  unFavoriteDog: ReturnType<typeof useFavoritePets>['unFavoritePet'];
  unFavoriteDogs: ReturnType<typeof useFavoritePets>['unFavoritePets'];
};

type Props = RCProps;

const Context = createContext<FavoriteDogsContext>({} as FavoriteDogsContext);

export const FavoriteDogsProvider = ({ children }: Props) => {
  const {
    favoritePets: favoriteDogs,
    favoritePet: favoriteDog,
    unFavoritePet: unFavoriteDog,
    unFavoritePets: unFavoriteDogs
  } = useFavoritePets('dog');

  const value: FavoriteDogsContext = {
    favoriteDogs,
    favoriteDog,
    unFavoriteDog,
    unFavoriteDogs
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useFavoriteDogsContext = () => useContext(Context);
