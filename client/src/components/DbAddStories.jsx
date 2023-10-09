import React, { useState } from 'react';
import { Spinner } from '.';
import { FaCloudUploadAlt, MdDelete } from '../asset/icons';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../config/firebase.config';
import { useDispatch, useSelector } from 'react-redux';
import { alertDanger, alertNull, alertSuccess } from '../context/actions/alertActions';
import { buttonClick } from '../animations';
import { motion } from 'framer-motion';
import { addNewStoryBook, getAllStoryBooks } from '../api';
import { setAllStory } from '../context/actions/storyBook';

const DbAddStories = () => {
  const dispatch = useDispatch();

  // State variables for storybook form data
  const [storybookName, setStorybookName] = useState('');
  const [description, setDescription] = useState('');
  const [imageDownloadURL, setImageDownloadURL] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(null);
  const alert = useSelector((state) => state.alert);
  const [selectedPdfName, setSelectedPdfName] = useState('');
  const [Pdf_url, setPdf_url] = useState('');

  // Function to handle image upload
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error: ${error}`));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setImageDownloadURL(downloadURL);
            setIsLoading(false);
            setProgress(null);
            dispatch(alertSuccess('Image Uploaded to cloud '));
            setTimeout(() => {
              dispatch(alertNull());
            }, 3000);
          });
      }
    );
  };

  // Function to delete the uploaded image from Firebase
  const deleteImageFromFirebase = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageDownloadURL);

    deleteObject(deleteRef)
      .then(() => {
        setImageDownloadURL(null);
        setIsLoading(false);
        dispatch(alertSuccess('Image deleted successfully'));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      });
  };

  // Function to handle PDF file upload
const uploadPdf = (e) => {
  const pdfFile = e.target.files[0];
  setPdfFile(pdfFile);

  if (pdfFile) {
    const storageRef = ref(storage, `pdfs/${Date.now()}_${pdfFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, pdfFile);

    uploadTask.on(
      'state_changed',
      null, // Removed progress tracking
      (error) => {
        dispatch(alertDanger(`Error: ${error}`));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL) => {
            setSelectedPdfName(pdfFile.name); // Set the selected PDF file name
            setPdf_url(downloadURL); // Set the PDF download URL

            dispatch(alertSuccess('PDF Uploaded to cloud'));
            setTimeout(() => {
              dispatch(alertNull());
            }, 3000);
          })
          .catch((error) => {
            dispatch(alertDanger(`Error: ${error}`));
            setTimeout(() => {
              dispatch(alertNull());
            }, 3000);
          });
      }
    );
  }
};


  // Function to save a new storybook
  const saveNewStorybook = () => {
    if (!storybookName || !description || !imageDownloadURL || !pdfFile) {
      dispatch(alertDanger('Please fill in all the fields.'));
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
      return;
    }

    

    // Create an object with storybook data
    const data = {
      storybook_name: storybookName,
      description: description,
      image_url: imageDownloadURL,
      Pdf_url: Pdf_url , // Note: You may need to modify this to store the PDF content, not the file object
    };

    // Call the API function to add a new storybook
    addNewStoryBook(data)
      .then((res) => {
        console.log(res);
        dispatch(alertSuccess('New item added successfully'));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);

        // Clear form fields after successful submission
        setStorybookName('');
        setDescription('');
        setImageDownloadURL(null);
        setPdfFile(null);
        setSelectedPdfName('');
      })
      .then(() => {
        // After adding the new storybook, retrieve all storybooks again
        getAllStoryBooks()
          .then((data) => {
            // Dispatch the data or perform any necessary actions
            dispatch(setAllStory(data)); // You may want to dispatch an action with the retrieved data
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
        dispatch(alertDanger('Error adding new storybook.'));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      });
  };
  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full ">
      <div className="border border-gray-200 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        {/* ... other input fields ... */}
        <InputValueField
          type="text"
          placeholder="Storybook Name"
          stateFunc={setStorybookName}
          stateValue={storybookName}
        />

        <InputValue
          type="text"
          placeholder="Storybook Description (max 100 words)"
          stateFunc={setDescription}
          stateValue={description}
          maxLength={100}
        />

        <div className="w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
          {isLoading ? (
            <div className="w-full h-full flex flex-col items-center justify-evenly px-24">
              <Spinner />
              {Math.round(progress > 0) && (
                <div className="w-full flex flex-col items-center justify-center gap-2">
                  <div className="justify-between w-full flex">
                    <span className="text-base font-medium text-textColor">progress</span>
                    <span className="text-sm font-medium text-textColor">
                      {Math.round(progress) > 0 && <>{`${Math.round(progress)}%`}</>}
                    </span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2.5'>
                    <div className="bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
                      style={{
                        width: `${Math.round(progress)}%`
                      }}>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {!imageDownloadURL ? (
                <>
                  <label>
                    <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                      <div className="items-center justify-center flex flex-col cursor-pointer">
                        <p className="font-bold text-4xl">
                          <FaCloudUploadAlt className="rotate-0" />
                        </p>
                        <p className="text-lg text-textColor">Click here to upload image</p>
                      </div>
                    </div>
                    <input
                      type='file'
                      name='upload-image'
                      accept='image/*'
                      onChange={uploadImage}
                      className='w-0 h-0'
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative w-full h-full overflow-hidden rounded-md">
                    <motion.img
                      whileHover={{ scale: 1.15 }}
                      src={imageDownloadURL}
                      className="w-full h-full object-cover"
                    />
                    <motion.button
                      {...buttonClick}
                      type="button"
                      className="absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out "
                      onClick={() => deleteImageFromFirebase(imageDownloadURL)}
                    >
                      <MdDelete className='-rotate-0' />
                    </motion.button>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        <label>
          <div className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
            <div className="items-center justify-center flex flex-col cursor-pointer">
              <p className="font-bold text-4xl">
                <FaCloudUploadAlt className="rotate-0" />
              </p>
              <p className="text-lg text-textColor">Click here to upload PDF file</p>
            </div>
          </div>
          <input
            type='file'
            name='upload-pdf'
            accept='.pdf, .docx'
            onChange={uploadPdf}
            className='w-0 h-0'
          />
        </label>
        {/* Display the selected PDF file name */}
        {selectedPdfName && (
          <div className="text-textColor text-xl">
            Selected PDF File: {selectedPdfName}
          </div>
        )}


        <motion.button onClick={saveNewStorybook} {...buttonClick} className='w-9/12 py-2 rounded-md bg-red-400 text-primary hover:bg-red-500 cursor-pointer'>
          Submit
        </motion.button>
      </div>
    </div>
  );
};

export const InputValueField = ({ type, placeholder, stateValue, stateFunc }) => {
  return (
    <>
      <input
        type={type} placeholder={placeholder}
        className="w-full px-4 py-3 bg-slate-100 shadow-md outline-none rounded-md border border-gray-300 focus:border-red-500" value={stateValue}
        onChange={(e) => stateFunc(e.target.value)} />
    </>)
};

export const InputValue = ({ type, placeholder, stateValue, stateFunc, maxLength }) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLength) {
      stateFunc(inputValue);
    }
  };

  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-slate-100 shadow-md outline-none rounded-md border border-gray-300 focus:border-red-500"
        value={stateValue}
        onChange={handleInputChange}
      />
      {maxLength && stateValue.length > maxLength && (
        <p className="text-red-500 mt-2">Maximum {maxLength} words allowed.</p>
      )}
    </>
  );
};


export default DbAddStories;
