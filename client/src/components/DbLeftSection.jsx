import React from 'react';
import { logo } from '../asset';
import { NavLink } from 'react-router-dom';
import { isNotActiveStyles, isActiveStyles, isActive } from '../utils/styles';

const DbLeftSection = () => {
  return (
    <div
      className="h-full py-2 flex flex-col bg-slate-300 backdrop-blur-md shadow-md min-w-210 w-300 gap-3"
     
    >
      <NavLink to={"/"} className="flex items-center justify-start px-6 gap-4">
        <img src={logo} className="w-12" alt="" />
        <p className="font-semibold text-xl">Digi.Books</p>
      </NavLink>
      <hr />
      <ul className="flex flex-col gap-3">
        <NavLink
          to={"/dashboard/home"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-4 border-l-8 border-red-500`
              : isNotActiveStyles
          }
        >
          Home
        </NavLink>
        <NavLink
          to={"/dashboard/orders"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-4 border-l-8 border-red-500`
              : isNotActiveStyles
          }
        >
          Book orders
        </NavLink>
        <NavLink
          to={"/dashboard/items"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-4 border-l-8 border-red-500`
              : isNotActiveStyles
          }
        >
          Books
        </NavLink>
        <NavLink
          to={"/dashboard/newItems"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-4 border-l-8 border-red-500`
              : isNotActiveStyles
          }
        >
          Add New Books
        </NavLink>
        <NavLink
          to={"/dashboard/users"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-4 border-l-8 border-red-500`
              : isNotActiveStyles
          }
        >
          Users
        </NavLink>
        <NavLink
          to={"/dashboard/stories"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-4 border-l-8 border-red-500`
              : isNotActiveStyles
          }
        >
          AddStories
        </NavLink>
        <NavLink
          to={"/dashboard/shop"}
          className={({ isActive }) =>
            isActive
              ? `${isActiveStyles} px-4 py-4 border-l-8 border-red-500`
              : isNotActiveStyles
          }
        >
          Shop 
        </NavLink>
      </ul>

     
    </div>
  );
};

export default DbLeftSection;
