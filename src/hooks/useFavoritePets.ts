import { useEffect, useState } from 'react';

import { Pet, Species } from '../types';

type FavoritePetIds = Record<Pet['id'], Pet['id']>;

const getFavoritePetsFromLocalStorage = (species: Species): Pet[] => {
  try {
    return (
      JSON.parse(
        window.localStorage.getItem(`favorite-${species}`) as string
      ) || []
    );
  } catch (e) {
    return [];
  }
};

const setFavoritePetsToLocalStorage = (pets: Pet[], species: Species) => {
  window.localStorage.setItem(`favorite-${species}`, JSON.stringify(pets));
};

export const useFavoritePets = (species: Species) => {
  const [favoritePets, setFavoritePets] = useState<Pet[]>(
    getFavoritePetsFromLocalStorage(species)
  );

  const [favoritePetIds, setFavoritePetIds] = useState<FavoritePetIds>();

  const favoritePet = (pet: Pet) => {
    setFavoritePets((prev) => [...prev, pet]);
  };

  const unFavoritePet = (pet: Pet) => {
    setFavoritePets((prev) => prev.filter((item) => item.id !== pet.id));
  };

  const unFavoritePets = (pets: Pet[]) => {
    const ids = pets.map((pet) => pet.id);
    setFavoritePets((prev) => prev.filter((item) => ids.includes(item.id)));
  };

  useEffect(() => {
    setFavoritePetsToLocalStorage(favoritePets, species);
  }, [favoritePets]);

  useEffect(() => {
    setFavoritePetIds(
      favoritePets.reduce((acc, curr) => {
        acc[curr.id] = curr.id;
        return acc;
      }, {} as FavoritePetIds)
    );
  }, [favoritePets]);

  return {
    favoritePets,
    favoritePetIds,
    favoritePet,
    unFavoritePet,
    unFavoritePets
  };
};
