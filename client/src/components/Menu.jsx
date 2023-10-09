import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../components';
import { getAllStoryBooks } from '../api';
import { setAllStory } from '../context/actions/storyBook';
import ReadStory from './ReadStory'; // Import the ReadStory component

const Menu = () => {
  const dispatch = useDispatch();
  const storyData = useSelector((state) => state.story || []); // Initialize as an empty array

  
  const [isOpen, setIsOpen] = useState(false);
  
  const [Pdf_url, setPdf_url] = useState('');

  useEffect(() => {
    if (storyData.length === 0) {
      getAllStoryBooks()
        .then((data) => {
          dispatch(setAllStory(data));
        })
        .catch((err) => {
          console.error('Error fetching Story Books:', err);
        });
    }
  }, [storyData, dispatch]);

  // Function to open the modal and set the PDF URL
  const openModal = (Pdf_url) => {
    setIsOpen(true);
    setPdf_url(Pdf_url);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsOpen(false);
    setPdf_url('');
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-8 mt-28">
        <h1 className="text-3xl font-semibold mb-4">Story Books</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {storyData.map((storyItem, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <img
                src={storyItem.image_url}
                alt={storyItem.storybook_name}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{storyItem.storybook_name}</h2>
                {/* Open the modal with the PDF URL when the button is clicked */}
                <button
                  onClick={() => openModal(storyItem.Pdf_url)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg inline-block hover:bg-red-600 transition-colors"
                >
                  Read Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Render the ReadStory modal */}
      <ReadStory isOpen={isOpen} onClose={closeModal} Pdf_url={Pdf_url} />
    </div>
  );
};

export default Menu;
