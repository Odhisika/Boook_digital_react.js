import React, { useState } from 'react';
import { buttonClick } from '../animations';
import {motion} from "framer-motion"
import { IoBasket } from "../asset/icons";
import { useDispatch, useSelector } from 'react-redux';
import { addNewItemToCart, getAllCartItems } from '../api';
import { alertNull, alertSuccess } from '../context/actions/alertActions'
import { setCartItems } from '../context/actions/cartActions';
import { Link } from 'react-router-dom';

const SliderCad = ({ data, index }) => {
  const user = useSelector((state)=>state.user);
  const product = useSelector((state) => state.products);
  const dispatch= useDispatch();
 const SendToCart =()=>{
  addNewItemToCart(user ?. user_id, data).then(res=>{
    dispatch(alertSuccess("Added to cart"))
    getAllCartItems(user ?.user_id).then((items)=>{
      dispatch(setCartItems(items))
    })
    setInterval(()=>{
      dispatch(alertNull());
    } ,3000)
  })
 }

 const [isHovered, setIsHovered] = useState(false);

 const handleMouseEnter = () => {
   setIsHovered(true);
 };

 const handleMouseLeave = () => {
   setIsHovered(false);
 };


  return (
    <div className="bg-orange-100 hover:drop-shadow-lg backdrop-blur-md rounded-xl flex items-center justify-between relative px-4 py-2 w-full md:w-340 md:min-w-350 gap-3 overflow-y-auto">
      <img src={data.imageURL} className="w-40 h-40 md:w-32 md:mt-16 object-contain" alt="" />
      <div className="relative pt-12">
        <p className="text-xl text-headingColor font-semibold">{data.product_name}</p>
        <p className=" text-headingColor">{data.product_description}</p>
        <p className="text-lg font-semibold text-red-500 items-center justify-center gap-1">₵{parseFloat(data.product_price).toFixed(2)}</p>

        <motion.div
      {...buttonClick}
      onClick={SendToCart}
      className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center absolute -top-4 right-2"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <IoBasket className="cursor-pointer text-2xl text-primary" />
      {isHovered && (
      <div {...buttonClick} className=" bg-red-700 cursor-pointer font-bold flex-col text-red-950 px-2 py-1 rounded shadow">
          Add to Cart
        </div>
      )}
    </motion.div>
    <div className="w-full text-center mt-4">
       
        <Link to={`/bookdetails/${data.productid}`}>View Details</Link>
      </div>
      </div>
    </div>
  );
};

export default SliderCad;
