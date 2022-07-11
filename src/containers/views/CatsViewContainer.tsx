import { useEffect, useState } from 'react';
import { View } from '../../components/View';
import { PetsList } from '../../components/PetsList';
import { PetEditModal } from '../../components/PetEditModal';

import { usePets } from '../../hooks/usePets';
import { useSelectedPets } from '../../hooks/useSelectedPets';
import { useFavoritePets } from '../../hooks/useFavoritePets';
import { usePetEditForm } from '../../components/PetEditForm';

import { useFavoriteCatsContext } from '../../contexts/FavoriteCatsContext';

import { Pet } from '../../types';

export const CatsViewContainer = () => {
  const { pets, addPet, updatePet, removePet, removePets } = usePets('cats');

  const {
    areAllPetsSelected,
    areThereAnySelectedPets,
    areThereAnyPets,
    selectPet,
    selectedPets,
    unselectPet,
    selectAllPets,
    unselectAllPets
  } = useSelectedPets(pets, 'cats');

  const { favoritePets, favoritePet, unFavoritePet } = useFavoritePets(
    pets,
    'cats'
  );

  const { setFavoriteCats: setFavoriteCatsToContext } =
    useFavoriteCatsContext();

  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const editForm = usePetEditForm({
    onSubmit: (values, helpers) => {
      if (!values) {
        return;
      }

      setModalOpen(true);

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

      setModalOpen(false);

      helpers.resetForm();
    }
  });

  const onAddPet = () => {
    setModalOpen(true);
  };

  const onEditPet = (pet: Pet) => {
    setModalOpen(true);
    editForm.setValues(pet);
  };

  const onRemovePet = (pet: Pet) => {
    removePet(pet.id);
  };

  const onRemoveSelectedPets = () => {
    const ids = Array.from(selectedPets.values()).map(
      (pet) => (pet && pet.id) || ''
    );
    removePets(ids);
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
    favoritePet(pet.id);
  };
  const onUnFavoritePet = (pet: Pet) => {
    unFavoritePet(pet.id);
  };

  const onClosePetEditModal = () => {
    setModalOpen(false);
    editForm.resetForm();
  };

  useEffect(() => {
    setFavoriteCatsToContext(favoritePets);
  }, [favoritePets]);

  return (
    <View title="Add Cats">
      <PetsList
        pets={pets}
        selectedPets={selectedPets}
        favoritePets={favoritePets}
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
        open={modalOpen}
        onClose={onClosePetEditModal}
        formProps={editForm}
      />
    </View>
  );
};
