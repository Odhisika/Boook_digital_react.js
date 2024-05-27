import React, { useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MdShoppingCart, MdLogout } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, signOut } from 'firebase/auth';
import { setUserNull } from '../context/actions/userActions';
import { logo, avatar } from '../asset';
import { isActiveStyles, isNotActiveStyles } from '../utils/styles';
import { buttonClick, slideTop } from '../animations';
import { app } from '../config/firebase.config';
import { setCartOn } from '../context/actions/displayCartActions';
import { BsBellFill } from 'react-icons/bs';

const Header = () => {
  const user = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for user dropdown menu
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const firebaseAuth = getAuth(app);

  const handleSignOut = () => {
    signOut(firebaseAuth)
      .then(() => {
        dispatch(setUserNull());
        navigate('/login', { replace: true });
      })
      .catch((err) => console.log(err));
  };

  return (
    <header className="fixed z-50 inset-x-0 top-0 flex flex-col md:flex-row justify-between px-4 md:px-12 lg:px-20 py-4 bg-blue-300">
      <div className="flex items-center justify-between w-full md:w-auto">
        <NavLink to="/" className="flex items-center gap-4">
          <img src={logo} className="w-12" alt="Logo" />
          <p className="font-semibold text-xl">Digi.Books</p>
        </NavLink>
        <div className="md:hidden flex items-center gap-4">
          <div className="relative cursor-pointer">
            <motion.div
              {...buttonClick}
              onClick={() => dispatch(setCartOn())}
              className="relative cursor-pointer"
            >
              <MdShoppingCart className="text-3xl text-textColor" />
              {cart?.length > 0 && (
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 -right-1">
                  <p className="text-primary text-base font-semibold">{cart?.length}</p>
                </div>
              )}
            </motion.div>
          </div>
          <div className="relative cursor-pointer">
            <motion.div
              {...buttonClick}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="w-10 h-10 rounded-md bg-slate-50 backdrop-blur-md cursor-pointer shadow-md flex items-center justify-center"
            >
              <BsBellFill className=" text-gray-400 text-xl" />
            </motion.div>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-12 right-0 w-48 bg-slate-400 backdrop-blur-md rounded-md shadow-md"
              >
                <div className="px-4 py-2">
                  <p className="text-xl text-textColor font-semibold">Notifications</p>
                </div>
                <div className="divide-y bg-primary">
                  <div className="px-4 py-3">
                    <p className="text-textColor"> No Notification</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          <button
            className="text-2xl text-black focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      <nav className={`md:flex items-center font-semibold gap-8 ${isMenuOpen ? 'flex flex-col md:flex-row' : 'hidden md:flex'}`}>
        <ul className="flex flex-col md:flex-row items-center justify-center gap-6">
          <NavLink
            className={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}
            to="/"
          >
            Books
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}
            to="/shop"
          >
            Shop
          </NavLink>

          <NavLink
            className={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}
            to="/menu"
          >
            Read Free Books
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}
            to="/services"
          >
            Services
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? isActiveStyles : isNotActiveStyles)}
            to="/aboutus"
          >
            About Us
          </NavLink>
        </ul>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative cursor-pointer">
            <motion.div
              {...buttonClick}
              onClick={() => dispatch(setCartOn())}
              className="relative cursor-pointer"
            >
              <MdShoppingCart className="text-3xl text-textColor" />
              {cart?.length > 0 && (
                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 -right-1">
                  <p className="text-primary text-base font-semibold">{cart?.length}</p>
                </div>
              )}
            </motion.div>
          </div>

          <div className="relative cursor-pointer">
            <motion.div
              {...buttonClick}
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="w-10 h-10 rounded-md bg-slate-50 backdrop-blur-md cursor-pointer shadow-md flex items-center justify-center"
            >
              <BsBellFill className=" text-gray-400 text-xl" />
            </motion.div>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-12 right-0 w-48 bg-slate-400 backdrop-blur-md rounded-md shadow-md"
              >
                <div className="px-4 py-2">
                  <p className="text-xl text-textColor font-semibold">Notifications</p>
                </div>
                <div className="divide-y bg-primary">
                  <div className="px-4 py-3">
                    <p className="text-textColor"> No Notification</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {user ? (
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <div className="w-12 h-12 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center">
              <motion.img
                className="w-full h-full object-cover"
                src={user?.picture ? user?.picture : avatar}
                whileHover={{ scale: 1.15 }}
                referrerPolicy="no-referrer"
              />
            </div>
            {isDropdownOpen && (
              <motion.div
                {...slideTop}
                className="px-6 py-4 w-48 bg-slate-400 backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap"
              >
                {user?.user_id === process.env.REACT_APP_ADMIN_ID && (
                  <Link className="hover:text-red-500 text-xl text-textColor" to="/dashboard/home">
                    Dashboard
                  </Link>
                )}
                <Link className="hover:text-red-500 text-xl text-textColor" to="/profile">
                  My Profile
                </Link>
                <Link className="hover:text-red-500 text-xl text-textColor" to="/user-orders">
                  Orders
                </Link>
                <hr />
                <motion.div
                  {...buttonClick}
                  onClick={handleSignOut}
                  className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3"
                >
                  <MdLogout className="text-2xl text-textColor group-hover:text-headingColor" />
                  <p className="text-textColor text-xl group-hover:text-headingColor">Sign Out</p>
                </motion.div>
              </motion.div>
            )}
          </div>
        ) : (
          <NavLink to="/login">
            <motion.button
              {...buttonClick}
              className="px-4 py-2 rounded-md shadow-md bg-lighttextGray border border-red-300 cursor-pointer"
            >
              Login
            </motion.button>
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
