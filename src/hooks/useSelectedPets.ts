import { useEffect, useState } from 'react';

import { Pet, Species, PetsMap } from '../types';

const getSelectedPetsFromLocalStorage = (species: Species): PetsMap => {
  try {
    return new Map(
      JSON.parse(window.localStorage.getItem(`selected-${species}`) || '[]')
    );
  } catch (e) {
    return new Map();
  }
};

const setSelectedPetsToLocalStorage = (
  species: Species,
  selectedPets: PetsMap
) => {
  window.localStorage.setItem(
    `selected-${species}`,
    JSON.stringify(Array.from(selectedPets.entries()))
  );
};

export const useSelectedPets = (pets: PetsMap, species: Species) => {
  const [selectedPets, setSelectedPets] = useState<PetsMap>(
    getSelectedPetsFromLocalStorage(species)
  );

  const selectPet = (id: Pet['id']) => {
    setSelectedPets((prev) => {
      const next = new Map(prev);
      next.set(id, pets.get(id));
      return next;
    });
  };

  const unselectPet = (id: Pet['id']) => {
    setSelectedPets((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  };

  const selectAllPets = () => {
    setSelectedPets(new Map(pets));
  };

  const unselectAllPets = () => {
    setSelectedPets(new Map());
  };

  const areAllPetsSelected =
    selectedPets.size > 0 && selectedPets.size === pets.size;

  const areThereAnySelectedPets = selectedPets.size > 0;
  const areThereAnyPets = pets.size > 0;

  useEffect(() => {
    setSelectedPets((prev) => {
      const next = new Map(prev);
      next.forEach((p) => {
        if (p && !pets.has(p.id)) {
          next.delete(p.id);
        }
      });
      return next;
    });
  }, [pets]);

  useEffect(() => {
    setSelectedPetsToLocalStorage(species, selectedPets);
  }, [selectedPets]);

  return {
    selectedPets,
    areAllPetsSelected,
    areThereAnySelectedPets,
    areThereAnyPets,
    selectPet,
    unselectPet,
    selectAllPets,
    unselectAllPets
  };
};
