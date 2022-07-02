import { useEffect, useState } from 'react';
import { View } from '../../components/View';
import { PetsList } from '../../components/PetsList';
import { PetEditModal } from '../../components/PetEditModal';

import { usePets } from '../../hooks/usePets';
import { usePetEditForm } from '../../components/PetEditForm';

import { Pet } from '../../types';

export const DogsViewContainer = () => {
  const {
    pets,
    selectedPets,
    addPet,
    updatePet,
    removePet,
    removeSelectedPets,
    selectPet,
    selectAllPets,
    unselectPet,
    unselectAllPets,
    areAllPetsSelected,
    areThereAnySelectedPets,
    areThereAnyPets
  } = usePets('dog');

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
  };

  const onRemoveSelectedPets = () => {
    removeSelectedPets();
  };

  const onSelectPet = (pet: Pet) => {
    selectPet(pet.id);
  };

  const onUnselectPet = (pet: Pet) => {
    console.log('dsds');
    unselectPet(pet.id);
  };

  const onSelectAllPets = () => {
    selectAllPets();
  };

  const onUnselectAllPets = () => {
    unselectAllPets();
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
        selectedPets={selectedPets}
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
