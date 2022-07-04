import { useEffect, useState } from 'react';

import { Pet, Species } from '../types';

type SelectedPetIds = Record<Pet['id'], Pet['id']>;

const getSelectedPetsFromLocalStorage = (species: Species): SelectedPetIds => {
  try {
    return (
      JSON.parse(
        window.localStorage.getItem(`selected-${species}`) as string
      ) || {}
    );
  } catch (e) {
    return {};
  }
};

const setSelectedPetsToLocalStorage = (
  species: Species,
  selectedPets: SelectedPetIds
) => {
  window.localStorage.setItem(
    `selected-${species}`,
    JSON.stringify(selectedPets)
  );
};

export const useSelectedPets = (pets: Pet[], species: Species) => {
  const [selectedPetIds, setSelectedPetIds] = useState<SelectedPetIds>(
    getSelectedPetsFromLocalStorage(species)
  );

  const selectPet = (id: Pet['id']) => {
    setSelectedPetIds((prev) => ({
      ...prev,
      [id]: id
    }));
  };

  const unselectPet = (id: Pet['id']) => {
    setSelectedPetIds((prev) =>
      Object.keys(prev).reduce((acc, curr) => {
        if (curr !== id) {
          acc[curr] = curr;
        }
        return acc;
      }, {} as SelectedPetIds)
    );
  };

  const selectAllPets = () => {
    setSelectedPetIds(
      pets.reduce((acc, curr) => {
        acc[curr.id] = curr.id;
        return acc;
      }, {} as SelectedPetIds)
    );
  };

  const unselectAllPets = () => {
    setSelectedPetIds({});
  };

  const areAllPetsSelected =
    Object.keys(selectedPetIds).length > 0 &&
    Object.keys(selectedPetIds).length === pets.length;

  const areThereAnySelectedPets = Object.keys(selectedPetIds).length > 0;
  const areThereAnyPets = pets.length > 0;

  useEffect(() => {
    setSelectedPetIds(
      pets.reduce((acc, curr) => {
        if (selectedPetIds[curr.id]) {
          acc[curr.id] = curr.id;
        }
        return acc;
      }, {} as SelectedPetIds)
    );
  }, [pets]);

  useEffect(() => {
    setSelectedPetsToLocalStorage(species, selectedPetIds);
  }, [selectedPetIds]);

  return {
    selectedPetIds,
    areAllPetsSelected,
    areThereAnySelectedPets,
    areThereAnyPets,
    selectPet,
    unselectPet,
    selectAllPets,
    unselectAllPets
  };
};
