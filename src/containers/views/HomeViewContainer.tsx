import { Link } from 'react-router-dom';
import { View } from '../../components/View';

export const HomeViewContainer = () => {
  return (
    <View title="Select your pet">
      <div className="flex  justify-center h-screen">
        <div className="flex-1">
          <section className="grid gap-2 sm:grid-cols-2">
            <Link to="/cats">
              <section className="rounded-lg  bg-gray-50 border  p-16 hover:bg-gray-100">
                <h3 className="text-2xl sm:text-4xl font-semibold text-center">
                  Cat
                </h3>
              </section>
            </Link>
            <Link to="/dogs">
              <section className="rounded-lg  bg-gray-50 border  p-16 hover:bg-gray-100">
                <h3 className="text-2xl sm:text-4xl font-semibold text-center">
                  Dog
                </h3>
              </section>
            </Link>
          </section>
        </div>
      </div>
    </View>
  );
};
