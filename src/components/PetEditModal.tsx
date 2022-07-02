import XIcon from '@heroicons/react/outline/XIcon';
import { Portal } from './Portal';
import { PetEditForm, PetEditFormProps } from './PetEditForm';

import { RCProps } from '../types';

export type PetEditModal = {
  open: boolean;
  loading: boolean;
};

type Props = RCProps<{
  open: boolean;
  loading: boolean;
  onClose: () => void;
  formProps: PetEditFormProps;
}>;

export const PetEditModal = ({ open, onClose, formProps }: Props) => {
  const isToEdit = !!formProps.getFieldProps('id').value;
  return (
    <Portal>
      {(open && (
        <div className="flex w-full justify-center items-center px-10 bg-gray-900/25  fixed top-0 left-0 bottom-0 right-0 backdrop-blue">
          <section className="bg-white rounded-md min-w-fit w-[600px] border border-gray-200 shadow-md shadow-gray-400">
            <header className="p-5 items-center justify-between flex">
              <div>
                <h3 className="uppercase font-semibold text-lg mb-2">
                  {isToEdit ? 'Edit' : 'Add'}
                </h3>
              </div>
              <button onClick={onClose}>
                <XIcon className="h-5 w-5" />
              </button>
            </header>
            <div className="h-2/12 p-5">
              <PetEditForm {...formProps} />
            </div>
          </section>
        </div>
      )) ||
        null}
    </Portal>
  );
};
