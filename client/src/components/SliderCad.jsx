import React from 'react';
import { motion } from 'framer-motion';
import { IoBasket } from '../asset/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addNewItemToCart, getAllCartItems } from '../api';
import { alertNull, alertSuccess } from '../context/actions/alertActions';
import { setCartItems } from '../context/actions/cartActions';

const SliderCad = ({ data }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const SendToCart = () => {
    addNewItemToCart(user?.user_id, data).then((res) => {
      dispatch(alertSuccess('Added to cart'));
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
      });
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
    });
  };

  return (
    <div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={data.imageURL} className="w-full h-64 object-cover" alt="Product" />
      <div className="px-4 py-2">
        <div className="font-bold text-xl mb-2 text-gray-800">{data.product_name}</div>
        <p className="text-gray-700 text-base">{data.product_description}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-red-500 text-lg font-semibold">₵{parseFloat(data.product_price).toFixed(2)}</p>
          <motion.button
            onClick={SendToCart}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline"
          >
            Add to Cart
          </motion.button>
          <IoBasket className="text-2xl text-primary cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default SliderCad;
