import React from 'react'
import { BsToggles2, MdSearch  } from '../asset/icons'
import { useSelector, useDispatch } from 'react-redux'
import { BsBellFill } from 'react-icons/bs'
import {motion} from "framer-motion"
import { buttonClick } from '../animations'
import { MdLogout } from 'react-icons/md';
import { avatar} from '../asset'
import {getAuth} from "firebase/auth";
import {app} from "../config/firebase.config"
import { setUserNull } from '../context/actions/userActions';
import { NavLink, useNavigate } from 'react-router-dom'

const DbHeader = () => {
    const user = useSelector (state =>state.user)
    const firebaseAuth = getAuth(app);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signOut=() =>{
       firebaseAuth.signOut().then(() =>{
           dispatch(setUserNull());
           navigate("/Login", { replace: true});
       })
       .catch((err)=>console.log(err));
    }
  return (
    <div className=" w-full flex items-center justify-between gap-3">
      <p className=' text-2xl text-headingColor'>Welcome to Digi.Books
        {/* {user?.name &&(
            <span className=" block text-base text-gray-500">{`Hello ${user?.name}...!`}</span>
        )} */}
      </p>
      <div className=" flex items-center justify-center gap-4">
        <div className=' flex items-center justify-center gap-3 px-4 py-2 bg-slate-50 rounded-md backdrop-blur-md shadow-md'>
            <MdSearch className=" text-2xl text-gray-400"/>
            <input type='text' placeholder='Search Here...' className=' border-none outline-none bg-transparent w-32 text-base font-semibold text-textColor'/>
            <BsToggles2 className=" text-2x text-gray-400"/>
        </div>
        <motion.div
        {...buttonClick}
         className=" w-10 h-10 rounded-md bg-slate-50 backdrop-blur-md cursor-pointer shadow-md flex items-center justify-center">
            <BsBellFill className=" text-gray-400 text-xl"/>

        </motion.div>
            <div className=" flex items-center justify-center gap-2">
            <div className=' w-10 h-10 rounded-full shadow-md cursor-pointer overflow-hidden'>
                <motion.img className=' w-full h-full object-cover' 
                src={user?.picture ? user?.picture : avatar} 
                 whileHover={{scale:1.15}}
                 referrerPolicy='no-referrer'
                />
            </div>
            <motion.div {...buttonClick} 
                    onClick={signOut}
                    className=" w-10 h-10 rounded-full shadow-md cursor-pointer overflow-hidden flex items-center justify-center gap-2" >
                        <MdLogout className=' text-gray-400 text-xl" '/>
                      
                    </motion.div>

            </div>
      </div>
    </div>
  )
}

export default DbHeader
