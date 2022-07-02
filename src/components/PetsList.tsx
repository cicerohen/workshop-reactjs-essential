import { PetsListItem } from './PetsListItem';
import { PetsListActionsMenu } from './PetsListActionsMenu';

import { Pet, RCProps } from '../types';

type SelectedPets = Record<Pet['id'], Pet['id']>;

type Props = RCProps<{
  pets: Pet[];
  selectedPets: SelectedPets;
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
}>;

export const PetsList = ({
  pets,
  selectedPets,
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
  onUnselectAllPets
}: Props) => {
  return (
    <section className="space-y-4">
      <PetsListActionsMenu
        onAddPet={onAddPet}
        onSelectAllPets={onSelectAllPets}
        onUnselectAllPets={onUnselectAllPets}
        onRemoveSelectedPets={onRemoveSelectedPets}
        areAllPetsSelected={areAllPetsSelected}
        areThereAnySelectedPets={areThereAnySelectedPets}
        areThereAnyPets={areThereAnyPets}
      />
      <ul className="divide-y">
        {pets.map((pet) => {
          return (
            <PetsListItem
              {...pet}
              key={pet.id}
              selected={!!selectedPets?.[pet.id]}
              onEditPet={onEditPet}
              onRemovePet={onRemovePet}
              onSelectPet={onSelectPet}
              onUnselectPet={onUnselectPet}
            />
          );
        })}
      </ul>
    </section>
  );
};
