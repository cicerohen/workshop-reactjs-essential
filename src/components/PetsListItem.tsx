import clsx from 'clsx';
import BookmarkIcon from '@heroicons/react/outline/BookmarkIcon';
import { PetsListItemActionsMenu } from './PetsListItemActionsMenu';

import { RCProps, Pet } from '../types';
import React from 'react';

type Props = RCProps<
  Partial<{
    selected?: boolean;
    favorite: boolean;
    showSelector: boolean;
    showActionsMenu: boolean;
    showBookmarker: boolean;
    onEditPet: (pet: Pet) => void;
    onRemovePet: (pet: Pet) => void;
    onSelectPet: (pet: Pet) => void;
    onUnselectPet: (pet: Pet) => void;
    onFavoritePet: (pet: Pet) => void;
    onUnfavoritePet: (pet: Pet) => void;
  }> &
    Pet
>;

export const PetsListItem = ({
  id,
  name,
  breed,
  showSelector,
  showActionsMenu,
  showBookmarker,
  selected,
  favorite,
  onSelectPet,
  onUnselectPet,
  onEditPet,
  onRemovePet,
  onFavoritePet,
  onUnfavoritePet
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

  const onToggleFavoriteHandler = () => {
    if (favorite && onUnfavoritePet) {
      onUnfavoritePet(pet);
      return;
    } else if (!favorite && onFavoritePet) {
      onFavoritePet(pet);
    }
  };

  return (
    <li className={(selected && 'bg-gray-50') || ''}>
      <div className="flex items-center px-4 py-6">
        {showSelector && (
          <input
            type="checkbox"
            className="mr-4 w-4 h-4 accent-gray-500"
            checked={selected}
            onChange={onToggleSelectHandler}
          />
        )}
        <div className="flex items-center">
          <h2 className={clsx('text-xl mr-4', selected && 'font-semibold')}>
            {name}
          </h2>
          <span className="uppercase text-xs px-2 py-1 border text-gray-600 border-gray-200 bg-gray-50 rounded-md">
            {breed}
          </span>
        </div>
        <div className="flex items-center ml-auto">
          {showBookmarker && (
            <button onClick={onToggleFavoriteHandler}>
              <BookmarkIcon
                className={clsx(
                  'h-5 w-5 text-gray-800',
                  favorite && 'fill-current'
                )}
              />
            </button>
          )}
          {showActionsMenu && (
            <PetsListItemActionsMenu
              pet={pet}
              onEditPet={onEditPet}
              onRemovePet={onRemovePet}
            />
          )}
        </div>
      </div>
    </li>
  );
};
