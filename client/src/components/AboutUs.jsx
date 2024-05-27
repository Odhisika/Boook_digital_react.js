import React from 'react';
import { Header } from '../components';

const AboutUs = () => {
  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-slate-300">
      <Header />

      {/* About Us Section */}
      <section className="py-16 px-4 md:px-12 lg:px-24 flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl text-orange-600 font-bold mb-8">About Us</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Container 1 */}
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl text-orange-600 font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700">
              Empowering parents and guardians with accessible education through a curated selection of elementary and secondary school books.
            </p>
          </div>

          {/* Container 3 */}
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl text-orange-600 font-semibold mb-4">Our Values</h2>
            <p className="text-gray-700">
              Embodying accessibility, passion for learning, customer-centricity, cooperation, quality curation, innovation, and social responsibility.
            </p>
          </div>

          {/* Container 4 */}
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">History</h2>
            <p className="text-gray-700">
              A new initiative by dedicated education advocates, revolutionizing family access to educational resources and nurturing a love for learning.
            </p>
          </div>

          {/* Container 5 */}
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-orange-600  mb-4">Achievements</h2>
            <p className="text-gray-700">
              Digi.Books reached a significant milestone, curating diverse educational books and establishing a seamless ordering and delivery system.
            </p>
          </div>

          {/* Container 6 */}
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Contact Us</h2>
            <p className="text-gray-700">
              <p>  digibooks@gmail.come</p>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;