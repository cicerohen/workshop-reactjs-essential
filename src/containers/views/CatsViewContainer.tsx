import { useState } from 'react';
import { View } from '../../components/View';
import { PetsList } from '../../components/PetsList';
import { PetEditModal } from '../../components/PetEditModal';

import { usePets } from '../../hooks/usePets';
import { useSelectedPets } from '../../hooks/useSelectedPets';
import { usePetEditForm } from '../../components/PetEditForm';

import { useFavoriteCatsContext } from '../..//contexts/FavoriteCatsContext';

import { Pet } from '../../types';

export const CatsViewContainer = () => {
  const { pets, addPet, updatePet, removePet, removePets } = usePets('cat');

  const {
    selectedPetIds,
    areAllPetsSelected,
    areThereAnySelectedPets,
    areThereAnyPets,
    selectPet,
    unselectPet,
    selectAllPets,
    unselectAllPets
  } = useSelectedPets(pets, 'cat');

  const { favoriteCats, favoriteCat, unFavoriteCat } = useFavoriteCatsContext();

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
    unFavoriteCat(pet);
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
    favoriteCat(pet);
  };
  const onUnFavoritePet = (pet: Pet) => {
    unFavoriteCat(pet);
  };

  const onClosePetEditModal = () => {
    setModal({
      open: false,
      loading: false
    });
    editForm.resetForm();
  };

  return (
    <View title="Add Cats">
      <PetsList
        pets={pets}
        favoritePets={favoriteCats}
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
