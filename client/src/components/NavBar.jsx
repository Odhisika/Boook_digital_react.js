import React from 'react'
import { Link } from 'react-scroll';
import { isActiveStyles, isNotActiveStyles } from '../utils/styles';

const NavBar = () => {

  return (
    <div className="fixed z-40 inset-x-0 top-24 object-contain flex items-center justify-between px-10 md:px-10 py-6 h-6 bg-red-50">
      <nav className="flex items-center ml-0 flex-wrap justify-center flex-1 font-bold gap-32">
        <ul className=" md:flex flex-1 items-center cursor-pointer justify-center gap-6" >
          <Link
           isActiveStyles={isNotActiveStyles}
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
           isActiveStyles={isNotActiveStyles}
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
            isActiveStyles={isNotActiveStyles}
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
           isActiveStyles={isNotActiveStyles}
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