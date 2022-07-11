import { useEffect, useState } from 'react';
import { View } from '../../components/View';
import { PetsList } from '../../components/PetsList';
import { useFavoriteCatsContext } from '../../contexts/FavoriteCatsContext';
import { useFavoriteDogsContext } from '../../contexts/FavoriteDogsContext';

import { PetsMap } from '../../types';

export const FavoritePetsViewContainer = () => {
  const { favoriteCats } = useFavoriteCatsContext();
  const { favoriteDogs } = useFavoriteDogsContext();
  const [pets, setPets] = useState<PetsMap>(new Map());

  useEffect(() => {
    setPets(new Map([...favoriteCats, ...favoriteDogs]));
  }, [favoriteCats, favoriteDogs]);

  return (
    <View title="Favorite Pets">
      <PetsList pets={pets} />
    </View>
  );
};
