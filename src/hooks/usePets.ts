import { useState, useEffect } from 'react';
import { Species, Pet } from '../types';

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

export const usePets = (species: Species) => {
  const [pets, setPets] = useState<Pet[]>(getPetsFromLocalStorage(species));

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

  const removePets = (ids: Pet['id'][]) => {
    setPets((prev) => prev.filter((pet) => !ids.includes(pet.id)));
  };

  useEffect(() => {
    setPetsToLocalStorage(species, pets);
  }, [pets]);

  return {
    pets,
    addPet,
    updatePet,
    removePet,
    removePets
  };
};
