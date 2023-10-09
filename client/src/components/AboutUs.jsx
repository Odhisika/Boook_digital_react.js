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
              Describe your organization's mission and objectives here.
            </p>
          </div>

          {/* Container 2 */}
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Our Team</h2>
            <p className="text-gray-700">
              Introduce your team members and their roles within the organization.
            </p>
          </div>

          {/* Container 3 */}
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl text-orange-600 font-semibold mb-4">Our Values</h2>
            <p className="text-gray-700">
              Highlight the core values that guide your organization's work.
            </p>
          </div>

          {/* Container 4 */}
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">History</h2>
            <p className="text-gray-700">
              Provide a brief overview of your organization's history and milestones.
            </p>
          </div>

          {/* Container 5 */}
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-orange-600  mb-4">Achievements</h2>
            <p className="text-gray-700">
              Showcase your organization's significant achievements and successes.
            </p>
          </div>

          {/* Container 6 */}
          <div className="bg-white rounded-lg p-6 shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-orange-600 mb-4">Contact Us</h2>
            <p className="text-gray-700">
              Provide contact information and how users can reach out to your organization.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
