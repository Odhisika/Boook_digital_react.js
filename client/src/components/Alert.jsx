import React from 'react';
import { motion } from 'framer-motion';
import { fadeInOut } from '../animations';
import { FaCheck } from '../asset/icons';
import { BsExclamationTriangle } from 'react-icons/bs';

const Alert = ({ type, message }) => {
  if (type === "success") {
    return (
      <motion.div {...fadeInOut} className=" fixed z-50 top-4 right-4 px-4 py-2 rounded-md backdrop-blur-sm bg-emerald-700 shadow-md flex items-center gap-4">
        <FaCheck className="text-xl text-emerald-50" />
        <p className="text-xl text-emerald-50">{message}</p>
      </motion.div>
    );
  }

  if (type === "Warning") {
    return (
      <motion.div {...fadeInOut} className=" fixed z-50 top-4 right-4 px-4 py-2 rounded-md backdrop-blur-sm bg-orange-700 shadow-md flex items-center gap-4">
        <BsExclamationTriangle className="text-xl text-emerald-50" />
        <p className="text-xl text-orange-50">{message}</p>
      </motion.div>
    );
  }

  if (type === "Danger") {
    return (
      <motion.div {...fadeInOut} className=" fixed z-50 top-4 right-4 px-4 py-2 rounded-md backdrop-blur-sm bg-red-700 shadow-md flex items-center gap-4">
        <BsExclamationTriangle className="text-xl text-emerald-50" />
        <p className="text-xl text-red-200">{message}</p>
      </motion.div>
    );
  }

  if (type === "Info") {
    return (
      <motion.div {...fadeInOut} className="fixed z-50 top-4 right-4 px-4 py-2 rounded-md backdrop-blur-sm bg-blue-700 shadow-md flex items-center gap-4">
        <FaCheck className="text-xl text-blue-50" />
        <p className="text-xl text-blue-50">{message}</p>
      </motion.div>
    );
  }
  
};

export default Alert;

