import { useState } from 'react';
import { View } from '../../components/View';
import { PetsList } from '../../components/PetsList';
import { PetEditModal } from '../../components/PetEditModal';

import { usePets } from '../../hooks/usePets';
import { useSelectedPets } from '../../hooks/useSelectedPets';
import { usePetEditForm } from '../../components/PetEditForm';

import { useFavoriteDogsContext } from '../..//contexts/FavoriteDogsContext';

import { Pet } from '../../types';

export const DogsViewContainer = () => {
  const { pets, addPet, updatePet, removePet, removePets } = usePets('dog');

  const {
    selectedPetIds,
    areAllPetsSelected,
    areThereAnySelectedPets,
    areThereAnyPets,
    selectPet,
    unselectPet,
    selectAllPets,
    unselectAllPets
  } = useSelectedPets(pets, 'dog');

  const { favoriteDogs, favoriteDog, unFavoriteDog } = useFavoriteDogsContext();

  const [modal, setModal] = useState<PetEditModal>({
    loading: false,
    open: false
  });

  const editForm = usePetEditForm({
    onSubmit: (values, helpers) => {
      if (!values) {
        return;
      }

      setModal((prev) => ({ ...prev, loading: true }));

      if (values.id) {
        updatePet(values.id, {
          name: values.name,
          breed: values.breed
        });
      } else {
        addPet({
          name: values.name,
          breed: values.breed
        });
      }

      setModal({
        loading: false,
        open: false
      });

      helpers.resetForm();
    }
  });

  const onAddPet = () => {
    setModal({
      open: true,
      loading: false
    });
  };

  const onEditPet = (pet: Pet) => {
    setModal({
      open: true,
      loading: false
    });
    editForm.setValues(pet);
  };

  const onRemovePet = (pet: Pet) => {
    removePet(pet.id);
    unFavoriteDog(pet);
  };

  const onRemoveSelectedPets = () => {
    removePets(Object.keys(selectedPetIds));
  };

  const onSelectPet = (pet: Pet) => {
    selectPet(pet.id);
  };

  const onSelectAllPets = () => {
    selectAllPets();
  };

  const onUnselectPet = (pet: Pet) => {
    unselectPet(pet.id);
  };

  const onUnselectAllPets = () => {
    unselectAllPets();
  };

  const onFavoritePet = (pet: Pet) => {
    console.log('favorite', pet);
    favoriteDog(pet);
  };
  const onUnFavoritePet = (pet: Pet) => {
    console.log('unfavorite', pet);
    unFavoriteDog(pet);
  };

  const onClosePetEditModal = () => {
    setModal({
      open: false,
      loading: false
    });
    editForm.resetForm();
  };

  return (
    <View title="Add Dogs">
      <PetsList
        pets={pets}
        favoritePets={favoriteDogs}
        selectedPetIds={selectedPetIds}
        showSelector
        showBookmarker
        showActionsMenu
        areAllPetsSelected={areAllPetsSelected}
        areThereAnySelectedPets={areThereAnySelectedPets}
        areThereAnyPets={areThereAnyPets}
        onAddPet={onAddPet}
        onEditPet={onEditPet}
        onRemovePet={onRemovePet}
        onRemoveSelectedPets={onRemoveSelectedPets}
        onSelectPet={onSelectPet}
        onSelectAllPets={onSelectAllPets}
        onUnselectPet={onUnselectPet}
        onUnselectAllPets={onUnselectAllPets}
        onFavoritePet={onFavoritePet}
        onUnfavoritePet={onUnFavoritePet}
      />
      <PetEditModal
        open={modal.open}
        loading={modal.loading}
        onClose={onClosePetEditModal}
        formProps={editForm}
      />
    </View>
  );
};
