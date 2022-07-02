import { Link } from 'react-router-dom';
import MenuIcon from '@heroicons/react/solid/MenuIcon';
import { Nav } from './Nav';
import { RCProps } from '../types';

type Props = RCProps<
  Partial<{
    onOpenSidebar: () => void;
  }>
>;

export const Header = ({ onOpenSidebar }: Props) => {
  return (
    <header className="bg-indigo-900">
      <div className="px-8 h-24 flex items-center lg:container lg:px-0 lg:mx-auto">
        <h1 className="text-white font-semibold">
          <Link to="/">Pet Shelves</Link>
        </h1>
        <button
          className="ml-auto p-2 rounded-md text-indigo-200 bg-indigo-800 sm:hidden"
          onClick={onOpenSidebar}
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        <Nav />
      </div>
    </header>
  );
};
