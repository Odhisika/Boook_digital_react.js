import React from 'react';
import { Link } from 'react-scroll';
import { isActiveStyles, isNotActiveStyles } from '../utils/styles';

const PHeader = () => {
  return (
    <div className="w-screen inset-x-0 flex items-center justify-between px-12 md:px-20 py-6 h-4 bg-orange-200">
      <nav className="flex flex-1 items-center justify-center font-semibold gap-32">
        {/* Removed the hidden class */}
        <ul className="md:flex  flex-1 items-center justify-center gap-6">
          <Link
            className={isNotActiveStyles}
            activeClass={isActiveStyles}
            to="kindagerten"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            KG-1
          </Link>
          <Link
            className={isNotActiveStyles}
            activeClass={isActiveStyles}
            to="primary"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            KG-2
          </Link>
          <Link
            className={isNotActiveStyles}
            activeClass={isActiveStyles}
            to="jhs"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            KG-3
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default PHeader;
