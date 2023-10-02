import React, { useState } from 'react';
import { Link, Element } from 'react-scroll';
import { isActiveStyles, isNotActiveStyles } from '../utils/styles';
import { banks } from '../asset';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle the menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="w-full fixed z-50 inset-x-0 top-0 bg-orange-200 md:top-24 mt-2 py-2">
      <nav className="container mx-auto px-4 md:px-10 py-6 h-24 md:h-6 flex items-center justify-center">
        <div className="flex items-center">
          <img
            src={banks}
            className="w-24 h-10 cursor-pointer hidden"
            alt="Logo"
            onClick={toggleMenu}
          />
          <div className={`md:flex ${isOpen ? 'flex-col' : 'hidden'} md:flex-row items-center space-x-6 mt-2 md:mt-0`}>
            <Link
              isActiveStyles={isNotActiveStyles}
              activeClass={isActiveStyles}
              to="kindagerten"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              onClick={closeMenu}
              className="text-black-500 hover:text-black-400 text-lg"
            >
              Kindergarten
            </Link>
            <Link
              isActiveStyles={isNotActiveStyles}
              activeClass={isActiveStyles}
              to="primary"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              onClick={closeMenu}
              className="text-black-500 hover:text-black-400"
            >
              Primary School
            </Link>
            <Link
              isActiveStyles={isNotActiveStyles}
              activeClass={isActiveStyles}
              to="jhs"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              onClick={closeMenu}
              className="text-black-500 hover:text-black-400"
            >
              Junior High School
            </Link>
            <Link
              isActiveStyles={isNotActiveStyles}
              activeClass={isActiveStyles}
              to="shs"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
              onClick={closeMenu}
              className="text-black-500 hover:text-black-400 text-base"
            >
              Senior High School
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
