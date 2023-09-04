import React, { useEffect, useState } from 'react';
import { Header, MainLoader } from '../components';
import { bill } from "../asset";
import { NavLink } from "react-router-dom";
import { buttonClick, fadeInOut } from '../animations';
import { FaArrowLeft } from '../asset/icons';
import { motion } from "framer-motion";

const CheckOutSuccess = () => {
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
   
    setTimeout(() => {
      setIsLoading(false); 
    }, 3000); 

    
  }, []);

  return (
    <main className='w-screen min-h-screen flex items-center justify-start flex-col'>
      <Header />
      <div className='w-full flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24'>
        {isLoading ? (
          <motion.div
            {...fadeInOut}
            className="fixed z-50 inset-0  backdrop-blur-md flex items-center justify-center w-full"
          >
            <MainLoader />
          </motion.div>
        ) : (
          <>
            <img src={bill} className='w-full object-contain md:w-656' alt="" />
            <h1 className='text-[35px] text-headingColor font-bold'> You have placed your order successfully</h1>
            <motion.div {...buttonClick}>
              <NavLink to={"/"} className="flex items-center justify-center gap-4 text-2xl font-semibold text-textColor px-4 py-2 rounded-md border border-gray-300 hover:shadow-md">
                <FaArrowLeft className='text-3xl text-textColor' />
                Get back Home
              </NavLink>
            </motion.div>
          </>
        )}
      </div>
    </main>
  );
}

export default CheckOutSuccess;



