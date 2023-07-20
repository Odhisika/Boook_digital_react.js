import React from 'react'
import { Link } from 'react-scroll';
import { isActiveStyles, isNotActiveStyles } from '../utils/styles';

const NavBar = () => {

  return (
    <div className="fixed z-40 inset-x-0 top-24 flex items-center justify-between px-12 md:px-20 py-6 h-6 bg-red-50">
      <nav className="flex items-center justify-center flex-1 font-bold gap-32">
        <ul className="hidden md:flex items-center justify-center gap-6">
          <Link
           className={isNotActiveStyles}
           activeClass={isActiveStyles}
            to="kindagerten"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            Kindergarten
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
            Primary School
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
            Junior High School
          </Link>
          <Link
            className={isNotActiveStyles}
            activeClass={isActiveStyles}
            to="shs"
            spy={true}
            smooth={true}
            offset={-100}
            duration={500}
          >
            Senior High School
          </Link>
        </ul>
      </nav>
    </div>
  )
}

export default NavBar