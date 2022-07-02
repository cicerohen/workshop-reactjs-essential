import clsx from 'clsx';
import { PetsListItemActionsMenu } from './PetsListItemActionsMenu';

import { RCProps, Pet } from '../types';
import React from 'react';

type Props = RCProps<
  {
    selected?: boolean;
    onEditPet: (pet: Pet) => void;
    onRemovePet: (pet: Pet) => void;
    onSelectPet: (pet: Pet) => void;
    onUnselectPet: (pet: Pet) => void;
  } & Pet
>;

export const PetsListItem = ({
  id,
  name,
  breed,
  selected,
  onSelectPet,
  onUnselectPet,
  onEditPet,
  onRemovePet
}: Props) => {
  const pet = {
    id,
    name,
    breed
  };

  const onToggleSelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && onSelectPet) {
      onSelectPet(pet);
      return;
    }
    if (!e.target.checked && onUnselectPet) {
      onUnselectPet(pet);
    }
  };

  return (
    <li className={(selected && 'bg-gray-50') || ''}>
      <div className="flex items-center px-4 py-6">
        <input
          type="checkbox"
          className="mr-4 w-4 h-4 accent-gray-500"
          checked={selected}
          onChange={onToggleSelectHandler}
        />
        <div className="flex items-center">
          <h2 className={clsx('text-xl mr-4', selected && 'font-semibold')}>
            {name}
          </h2>
          <span className="uppercase text-xs px-2 py-1 border text-gray-600 border-gray-200 bg-gray-50 rounded-md">
            {breed}
          </span>
        </div>
        <PetsListItemActionsMenu
          pet={pet}
          onEditPet={onEditPet}
          onRemovePet={onRemovePet}
        />
      </div>
    </li>
  );
};
