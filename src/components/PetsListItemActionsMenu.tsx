import { Menu } from '@headlessui/react';

import DotsVerticalIcon from '@heroicons/react/outline/DotsVerticalIcon';
import TrashIcon from '@heroicons/react/outline/TrashIcon';
import PencilAltIcon from '@heroicons/react/outline/PencilAltIcon';
import { RCProps, Pet } from '../types';

type Props = RCProps<{
  pet: Pet;
  onEditPet: (pet: Pet) => void;
  onRemovePet: (pet: Pet) => void;
}>;

export const PetsListItemActionsMenu = ({
  pet,
  onEditPet,
  onRemovePet
}: Props) => {
  const onEditPetHandler = () => {
    if (onEditPet) {
      onEditPet(pet);
    }
  };

  const onRemovePetHandler = () => {
    if (onRemovePet) {
      onRemovePet(pet);
    }
  };
  return (
    <Menu as="menu" className="relative space-x-1 flex ml-auto">
      <Menu.Button className="px-3 py-2">
        <DotsVerticalIcon className="h-5 w-5 text-gray-400" />
      </Menu.Button>
      <Menu.Items className="absolute right-0 z-10 mt-8 w-48 divide-y border border-gray-200 divide-gray-100 rounded-md bg-white shadow-2xl">
        <div className="space-y-1 p-2">
          <Menu.Item>
            <button
              className="px-3 py-2 text-sm rounded-md  border border-gray-200  hover:bg-gray-100 flex w-full"
              onClick={onEditPetHandler}
            >
              <PencilAltIcon className="h-5 w-5 mr-1" />
              Edit
            </button>
          </Menu.Item>
          <Menu.Item>
            <button
              className="px-3 py-2 text-sm frounded-md border rounded-md border-red-50 hover:text-red-500 hover:bg-red-500/5 flex w-full"
              onClick={onRemovePetHandler}
            >
              <TrashIcon className="h-5 w-5 mr-1" />
              Remove
            </button>
          </Menu.Item>
        </div>
      </Menu.Items>
    </Menu>
  );
};
