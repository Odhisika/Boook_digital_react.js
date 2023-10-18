import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { avatar } from '../asset';
import { useNavigate } from 'react-router-dom';

const ProfileModal = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [newPicture, setNewPicture] = useState(null);

  const handleClose = () => {
    navigate('/', { replace: true });
  };

  const handlePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-96 p-4 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <img
            src={newPicture || user.picture || avatar}
            alt={user.name}
            className="h-24 w-24 rounded-full"
          />
          <label className="mt-2 p-1 border border-gray-400 rounded-md w-full text-center cursor-pointer">
            Edit profile picture 
            <input
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              className="hidden"
            />
          </label>
          <h2 className="text-2xl font-bold my-4">{user.name}</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>
          {/* Add other user information here */}
        </div>

        {/* Close button */}
        <div className="flex justify-end">
          <button
            onClick={handleClose}
            className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
