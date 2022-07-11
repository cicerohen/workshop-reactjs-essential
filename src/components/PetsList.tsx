import { PetsListItem } from './PetsListItem';
import { PetsListActionsMenu } from './PetsListActionsMenu';

import { Pet, RCProps, PetsMap } from '../types';

type Props = RCProps<
  Partial<{
    pets: PetsMap;
    favoritePets: PetsMap;
    selectedPets: PetsMap;
    showSelector: boolean;
    showBookmarker: boolean;
    showActionsMenu: boolean;
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
  selectedPets,
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
        {pets &&
          Array.from(pets.values()).map((pet) => {
            if (pet) {
              return (
                <PetsListItem
                  {...pet}
                  key={pet.id}
                  selected={selectedPets?.has(pet.id)}
                  favorite={favoritePets?.has(pet.id)}
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
            } else {
              return null;
            }
          })}
      </ul>
    </section>
  );
};
