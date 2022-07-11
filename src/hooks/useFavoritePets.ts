import { useEffect, useState } from 'react';

import { Pet, Species, PetsMap } from '../types';

export const getFavoritePetsFromLocalStorage = (species: Species): PetsMap => {
  try {
    return new Map(
      JSON.parse(window.localStorage.getItem(`favorite-${species}`) || '[]')
    );
  } catch (e) {
    return new Map();
  }
};

export const setFavoritePetsToLocalStorage = (
  species: Species,
  favoritePets: PetsMap
) => {
  window.localStorage.setItem(
    `favorite-${species}`,
    JSON.stringify(Array.from(favoritePets.entries()))
  );
};

export const useFavoritePets = (pets: PetsMap, species: Species) => {
  const [favoritePets, setFavoritePets] = useState<PetsMap>(
    getFavoritePetsFromLocalStorage(species)
  );

  const favoritePet = (id: Pet['id']) => {
    setFavoritePets((prev) => {
      if (pets.has(id)) {
        const next = new Map(prev);
        next.set(id, pets.get(id));
        return next;
      }
      return prev;
    });
  };

  const unFavoritePet = (id: Pet['id']) => {
    setFavoritePets((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  };

  const unFavoritePets = (ids: Pet['id'][]) => {
    setFavoritePets((prev) => {
      const next = new Map(prev);
      ids.forEach((id) => {
        next.delete(id);
      });
      return next;
    });
  };

  useEffect(() => {
    setFavoritePetsToLocalStorage(species, favoritePets);
  }, [favoritePets]);

  useEffect(() => {
    setFavoritePets((prev) => {
      const next = new Map(prev);
      next.forEach((p) => {
        if (p && !pets.has(p.id)) {
          next.delete(p.id);
        }
      });
      return next;
    });
  }, [pets]);

  return {
    favoritePets,
    favoritePet,
    unFavoritePet,
    unFavoritePets
  };
};
