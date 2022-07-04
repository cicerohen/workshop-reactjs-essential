import { View } from '../../components/View';
import { PetsList } from '../../components/PetsList';

import { useFavoriteCatsContext } from '../../contexts/FavoriteCatsContext';
import { useFavoriteDogsContext } from '../../contexts/FavoriteDogsContext';

export const FavoritePetsViewContainer = () => {
  const { favoriteCats } = useFavoriteCatsContext();
  const { favoriteDogs } = useFavoriteDogsContext();
  return (
    <View title="Favorite Pets">
      <div className="space-y-2">
        <div>
          <h2 className="text-lg uppercase font-semibold mb-8">Cats</h2>
          <PetsList pets={favoriteCats} />
        </div>
        <div>
          <h2 className="text-lg uppercase font-semibold mb-8">Dogs</h2>
          <PetsList pets={favoriteDogs} />
        </div>
      </div>
    </View>
  );
};
