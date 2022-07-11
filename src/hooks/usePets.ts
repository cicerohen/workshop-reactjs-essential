import { useState, useEffect } from 'react';
import { Species, Pet, PetsMap } from '../types';

const uuid = () => Math.random().toString(36).substring(2, 9);

export const getPetsFromLocalStorage = (species: Species): PetsMap => {
  try {
    return new Map(JSON.parse(window.localStorage.getItem(species) || '[]'));
  } catch (e) {
    return new Map();
  }
};

export const setPetsToLocalStorage = (species: Species, pets: PetsMap) => {
  window.localStorage.setItem(
    species,
    JSON.stringify(Array.from(pets.entries()))
  );
};

export const usePets = (species: Species) => {
  const [pets, setPets] = useState<PetsMap>(getPetsFromLocalStorage(species));

  const addPet = ({ name, breed }: Omit<Pet, 'id'>) => {
    setPets((prev) => {
      const next = new Map(prev);
      const id = uuid();
      next.set(id, {
        id,
        name,
        breed
      });
      return next;
    });
  };

  const updatePet = (id: Pet['id'], { name, breed }: Omit<Pet, 'id'>) => {
    setPets((prev) => {
      if (prev.has(id)) {
        const next = new Map(prev);
        next.set(id, {
          id,
          name,
          breed
        });
        return next;
      }
      return prev;
    });
  };

  const removePet = (id: Pet['id']) => {
    setPets((prev) => {
      if (prev.has(id)) {
        const next = new Map(prev);
        next.delete(id);
        return next;
      }

      return prev;
    });
  };

  const removePets = (ids: Pet['id'][]) => {
    setPets((prev) => {
      const next = new Map(prev);
      ids.forEach((id) => {
        if (next.has(id)) {
          next.delete(id);
        }
      });
      return next;
    });
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
