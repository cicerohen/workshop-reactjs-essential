import { Link } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav className="list-none hidden ml-auto space-x-1 sm:flex">
      <li>
        <Link
          to="/favorites"
          className="px-8 py-3 text-indigo-100 rounded-md  flex bg-indigo-800/50"
        >
          Favorite Pets
        </Link>
      </li>
      <li>
        <Link
          to="/cats"
          className="px-8 py-3 text-indigo-100 rounded-md  flex bg-indigo-800/50"
        >
          Add cats
        </Link>
      </li>
      <li>
        <Link
          to="/dogs"
          className="px-8 py-3  text-indigo-100 rounded-md  flex bg-indigo-800/50"
        >
          Add dogs
        </Link>
      </li>
    </nav>
  );
};
