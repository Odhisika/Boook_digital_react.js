import React from 'react';
import { Header } from '../components';

const Services = () => {
  return (
    <main className="w-screen min-h-screen flex flex-col items-center justify-start bg-orange-100">
      <Header />

      {/* Services Section */}
      <section className="py-16 px-4 md:px-12 lg:px-24 flex flex-col items-center justify-center text-white mt-20">
        <h1 className="text-4xl font-bold mb-8  text-orange-600  text-center">Our Services</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Service Card 1 */}
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl text-orange-600 font-semibold mb-4">Wide Textbook Selection</h2>
            <p className="text-gray-700">
              Browse and choose from a vast collection of approved textbooks for your child's education.
            </p>
          </div>

          {/* Service Card 2 */}
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Convenient Ordering</h2>
            <p className="text-gray-700">
              Easily place orders online, saving you time and effort. We deliver right to your doorstep.
            </p>
          </div>

          {/* Service Card 3 */}
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl font-semibold  text-orange-600 mb-4">Quality Guarantee</h2>
            <p className="text-gray-700">
              We ensure that all textbooks are of the highest quality and approved for educational use.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Services;
