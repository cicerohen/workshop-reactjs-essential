import clsx from 'clsx';
import XIcon from '@heroicons/react/solid/XIcon';
import { Link } from 'react-router-dom';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ isOpen = true, onClose }: Props) => {
  return (
    <aside
      className={clsx(
        'bg-gray-800 fixed right-0 transition duration-200 ease-in-out w-64 top-0 z-20 bottom-0',
        (isOpen && 'translate-x-0 lg:translate-x-full') || 'translate-x-full'
      )}
    >
      <div className="flex  h-24 px-8 items-center justify-between">
        <button className="ml-auto text-gray-500" onClick={onClose}>
          <XIcon className="h-6 w-6" />
        </button>
      </div>
      <nav className="list-none px-8 space-y-4">
        <li>
          <Link to="/cats" className="text-lg text-gray-300">
            Add cats
          </Link>
        </li>
        <li>
          <Link to="/dogs" className="text-lg text-gray-300">
            Add dogs
          </Link>
        </li>
      </nav>
    </aside>
  );
};
