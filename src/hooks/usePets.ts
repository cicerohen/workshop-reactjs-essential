import { useState, useEffect, useMemo } from 'react';
import { Species, Pet } from '../types';

type SelectedPets = Record<Pet['id'], Pet['id']>;

const uuid = () => Math.random().toString(36).substring(2, 9);

const getPetsFromLocalStorage = (species: Species): Pet[] => {
  try {
    return JSON.parse(window.localStorage.getItem(species) as string) || [];
  } catch (e) {
    return [];
  }
};

const setPetsToLocalStorage = (species: Species, pets: Pet[]) => {
  window.localStorage.setItem(species, JSON.stringify(pets));
};

const getSelectedPetsFromLocalStorage = (species: Species): SelectedPets => {
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
  selectedPets: SelectedPets
) => {
  window.localStorage.setItem(
    `selected-${species}`,
    JSON.stringify(selectedPets)
  );
};

export const usePets = (species: Species) => {
  const [pets, setPets] = useState<Pet[]>(getPetsFromLocalStorage(species));
  const [selectedPets, setSelectedPets] = useState<SelectedPets>(
    getSelectedPetsFromLocalStorage(species)
  );

  const areAllPetsSelected =
    Object.keys(selectedPets).length > 0 &&
    Object.keys(selectedPets).length === pets.length;

  const areThereAnySelectedPets = Object.keys(selectedPets).length > 0;
  const areThereAnyPets = pets.length > 0;

  const addPet = ({ name, breed }: Omit<Pet, 'id'>) => {
    const newPet = { id: uuid(), name, breed };
    setPets((prev) => [...prev, newPet]);
  };

  const updatePet = (id: Pet['id'], { name, breed }: Omit<Pet, 'id'>) => {
    setPets((prev) =>
      prev.map((pet: Pet) => {
        if (pet.id === id) {
          return {
            ...pet,
            name,
            breed
          };
        }
        return pet;
      })
    );
  };

  const removePet = (id: Pet['id']) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
  };

  const removeSelectedPets = () => {
    const ids = Object.keys(selectedPets);
    setPets((prev) => prev.filter((pet) => !ids.includes(pet.id)));
  };

  const selectPet = (id: Pet['id']) => {
    setSelectedPets((prev) => ({
      ...prev,
      [id]: id
    }));
  };

  const selectAllPets = () => {
    setSelectedPets(
      pets.reduce((acc, curr) => {
        acc[curr.id] = curr.id;
        return acc;
      }, {} as SelectedPets)
    );
  };

  const unselectPet = (id: Pet['id']) => {
    console.log('id', id);
    setSelectedPets((prev) =>
      Object.keys(prev).reduce((acc, curr) => {
        if (curr !== id) {
          acc[curr] = curr;
        }
        return acc;
      }, {} as SelectedPets)
    );
  };

  const unselectAllPets = () => {
    setSelectedPets({});
  };

  useEffect(() => {
    setPetsToLocalStorage(species, pets);
  }, [pets]);

  useEffect(() => {
    setSelectedPets(
      pets.reduce((acc, curr) => {
        if (selectedPets[curr.id]) {
          acc[curr.id] = curr.id;
        }
        return acc;
      }, {} as SelectedPets)
    );
  }, [pets]);

  useEffect(() => {
    setSelectedPetsToLocalStorage(species, selectedPets);
  }, [selectedPets]);

  return {
    pets,
    addPet,
    updatePet,
    removePet,
    removeSelectedPets,
    selectPet,
    selectAllPets,
    unselectPet,
    unselectAllPets,
    selectedPets,
    areAllPetsSelected,
    areThereAnySelectedPets,
    areThereAnyPets
  };
};
