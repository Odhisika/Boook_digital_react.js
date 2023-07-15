import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { app } from './config/firebase.config';
import {Dashboard, Login, Main } from "./containers";
import { useDispatch, useSelector } from 'react-redux';
import { getAllCartItems, validateUserJWTToken } from './api';
import { setUserDetails } from './context/actions/userActions';
import { fadeInOut } from './animations';
import { motion } from 'framer-motion';
import { Alert, CheckOutSuccess, MainLoader } from './components';
import { setCartItems } from './context/actions/cartActions';

const App = () => {
  const firebaseAuth = getAuth(app);
  const [isLoading, setIsLoading] = useState(false);
  const alert = useSelector((state) => state.alert);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    firebaseAuth.onAuthStateChanged((Cred) => {
      if (Cred) {
        Cred.getIdToken()
          .then((token) => {
            validateUserJWTToken(token)
              .then((data) => {
                if (data) {
                  getAllCartItems(data.user_id)
                    .then((items) => {
                      dispatch(setCartItems(items));
                      console.log(items);
                    })
                    .catch((error) => {
                      if (error.code === 'auth/network-request-failed') {
                        // Display a message to the user
                        alert('Please connect to the internet and refresh the page.');
                      } else {
                        // Handle other errors
                        console.error(error);
                      }
                    });
                }
                dispatch(setUserDetails(data));
              })
              .catch((error) => {
                if (error.code === 'auth/network-request-failed') {
                  // Display a message to the user
                  alert('Please connect to the internet and refresh the page.');
                } else {
                  // Handle other errors
                  console.error(error);
                }
              });
          })
          .catch((error) => {
            if (error.code === 'auth/network-request-failed') {
              // Display a message to the user
              alert('Please connect to the internet and refresh the page.');
            } else {
              // Handle other errors
              console.error(error);
            }
          });
      }
      setInterval(() => {
        setIsLoading(false);
      }, 3000);
    });
  }, []);

  return (
    <div className="w-screen min-h-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
        <motion.div
          {...fadeInOut}
          className=" fixed z-40 inset-0 bg-emerald-800 backdrop-blur-md flex items-center justify-center w-full"
        >
          <MainLoader />
        </motion.div>
      )}

      <Routes>
        <Route path="/*" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path= "checkout-success" element={<CheckOutSuccess/>}/>
      </Routes>

      {alert?.type && <Alert type={alert?.type} message={alert?.message} />}
    </div>
  );
};

export default App;
