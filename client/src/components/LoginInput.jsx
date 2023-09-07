import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInOut } from '../animations';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const LoginInput = ({
  placeholder,
  icon,
  inputState,
  inputStateFunc,
  type,
  props,
  isSignUp,
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <motion.div
      {...fadeInOut}
      className={`flex items-center justify-center gap-4 bg-slate-800 backdrop:blur-md rounded-md w-full px-2 py-2 ${
        isFocus ? ' shadow-md md:shadow-red-400' : 'shadow-none'
      }`}
    >
      {icon}
      {type !== 'PhoneNumber' ? (
        <input
          type={type}
          placeholder={placeholder}
          className="w-full h-full text-primary bg-slate-800 text-lg font-semibold border-none outline-none"
          value={inputState}
          onChange={(e) => inputStateFunc(e.target.value)}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
        />
      ) : (
        <PhoneInput
          country={'gh'} // You can change the default country as needed
          value={inputState}
          onChange={(phone) => inputStateFunc(phone)}
          inputProps={{maxLength: 16}}
          inputStyle={{
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
            fontSize: '16px', // Adjust the font size as needed
            backgroundColor: 'transparent',
            color: '#fff',
          }}
        />
      )}
    </motion.div>
  );
};

export default LoginInput;
