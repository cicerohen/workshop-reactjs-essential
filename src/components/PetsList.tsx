import { PetsListItem } from './PetsListItem';
import { PetsListActionsMenu } from './PetsListActionsMenu';

import { Pet, RCProps } from '../types';

type SelectedPets = Record<Pet['id'], Pet['id']>;

type Props = RCProps<
  Partial<{
    pets: Pet[];
    favoritePets: Pet[];
    showSelector: boolean;
    showBookmarker: boolean;
    showActionsMenu: boolean;
    selectedPetIds: SelectedPets;
    areAllPetsSelected: boolean;
    areThereAnySelectedPets: boolean;
    areThereAnyPets: boolean;
    onAddPet: (pet: Pet) => void;
    onEditPet: (pet: Pet) => void;
    onRemovePet: (pet: Pet) => void;
    onRemoveSelectedPets: () => void;
    onSelectPet: (pet: Pet) => void;
    onUnselectPet: (pet: Pet) => void;
    onSelectAllPets: () => void;
    onUnselectAllPets: () => void;
    onFavoritePet: (pet: Pet) => void;
    onUnfavoritePet: (pet: Pet) => void;
  }>
>;

export const PetsList = ({
  pets,
  favoritePets,
  selectedPetIds,
  showSelector,
  showBookmarker,
  showActionsMenu,
  areAllPetsSelected,
  areThereAnySelectedPets,
  areThereAnyPets,
  onAddPet,
  onEditPet,
  onRemovePet,
  onRemoveSelectedPets,
  onSelectPet,
  onSelectAllPets,
  onUnselectPet,
  onUnselectAllPets,
  onFavoritePet,
  onUnfavoritePet
}: Props) => {
  const favoritePetIds = favoritePets?.reduce((acc, curr) => {
    acc[curr.id] = curr.id;
    return acc;
  }, {} as Record<Pet['id'], Pet['id']>);
  return (
    <section className="space-y-4">
      {showActionsMenu && (
        <PetsListActionsMenu
          onAddPet={onAddPet}
          onSelectAllPets={onSelectAllPets}
          onUnselectAllPets={onUnselectAllPets}
          onRemoveSelectedPets={onRemoveSelectedPets}
          areAllPetsSelected={areAllPetsSelected}
          areThereAnySelectedPets={areThereAnySelectedPets}
          areThereAnyPets={areThereAnyPets}
        />
      )}
      <ul className="divide-y">
        {pets?.map((pet) => {
          return (
            <PetsListItem
              {...pet}
              key={pet.id}
              selected={!!selectedPetIds?.[pet.id]}
              favorite={!!favoritePetIds?.[pet.id]}
              showSelector={showSelector}
              showActionsMenu={showActionsMenu}
              showBookmarker={showBookmarker}
              onEditPet={onEditPet}
              onRemovePet={onRemovePet}
              onSelectPet={onSelectPet}
              onUnselectPet={onUnselectPet}
              onFavoritePet={onFavoritePet}
              onUnfavoritePet={onUnfavoritePet}
            />
          );
        })}
      </ul>
    </section>
  );
};
