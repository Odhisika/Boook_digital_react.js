import React, { useEffect, useState } from 'react';
import {  useLocation, useNavigate  } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, deleteCart, deleteCartItem , getAllCartItems, getCustomerInfor } from '../api';

import { setCartItems } from '../context/actions/cartActions';
import { buttonClick, staggerFadeInOut } from '../animations';
import { alertDanger, alertNull, alertSuccess } from '../context/actions/alertActions';
import axios from 'axios';
import { clearCartItems } from '../context/actions/cartActions'; // Replace with the correct path


const Payment = () => {
  const selectedOption = useLocation().state?.selectedOption;
  const user = useSelector((state) => state.user);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const dispatch = useDispatch();
  const info = useSelector((state) => state.info);
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
 

 

  useEffect(() => {
    if (!info) {
      getCustomerInfor(user?.user_id)
        .then((data) => {
          dispatch(setDeliveryInfo(data));
          console.log('Data from API:', data);
        })
        .catch((err) => {
          console.error('Error fetching customer information:', err);
        });
    } else {
      console.log(info);
    }
  }, [info, user?.user_id, dispatch]);

  useEffect(() => {
    if (!cart) {
      getAllCartItems(user?.user_id)
        .then((data) => {
          // Update cart items in the Redux store using your cartActions
          dispatch(setCartItems(data));
          console.log('Data from Cart:', data);
        })
        .catch((err) => {
          console.error('Error fetching Cart Items:', err);
        });
    } else {
      console.log(cart);
    }
  }, [cart, user?.user_id, dispatch]);

  const totalCartPrice = cart.reduce(
    (total, cartItem) => total + cartItem.product_price * cartItem.quantity,
    0
  );
  const deliveryFees = 45.10;
  const  overallTotal = totalCartPrice + deliveryFees;

  // useEffect(()=>{
  //   let deliveryFees =45.1;
  //   let overallTotal =0;
  //   if (cart){
  //     cart.map(()=>{
  //       overallTotal = totalCartPrice + deliveryFees
  //       settotal(overallTotal);
  //     });
  //   }
  // },[cart]);


  // ...
  
  const handleConfirmOrder = async () => {
    try {
      // Create the order
      const orderData = {
        overallTotal:overallTotal,
        user_id: user.user_id,
        CustomerDeliveryInfor: deliveryInfo,
        paymentMethod: selectedOption,
        cart: JSON.stringify(cart),
        createdAt: new Date(),
      };
  
      // Send a POST request to the createOrder API endpoint
      const response = await createOrder(orderData);

      dispatch(alertSuccess("You have successfully placed an order "));
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
      navigate('/checkout', { replace: true });
      console.log(orderData);
  
      if (response.data.success) {
         
        await deleteCart(clearCartItems)
        
         dispatch(clearCartItems());
         console.log(clearCartItems)

  
        // Handle success, e.g., show a success message
      } else {
        dispatch(alertDanger("Unknown error occurred while processing the order"));
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      // Handle error, e.g., show an error message
    }
  };
  
     

  return (
    <motion.div className='w-full grid grid-cols-1 h-full md:grid-cols-2 gap-4'>
      <div className='flex flex-col items-start h-full w-full bg-orange-300 justify-start gap-6 p-6'>
        {deliveryInfo &&
          deliveryInfo.map((item, index) => {
            if (item.userId === user.user_id) {
              return (
                <div key={index}>
                  <h2 className='text-2xl font-bold text-textColor w-full flex items-center justify-between'>
                    Confirm Delivery Information
                  </h2>
                  <div className='flex flex-col items-start justify-start gap-6'>
                    <div className='px-4 py-1 flex items-start justify-start gap-2 bg-primary w-full'>
                      Full Name: {item.firstName + item.SurName},
                      Address Line1: {item.AddressLine1},
                      Address Line2: {item.AddressLine2},
                      Phone Number: {item.PhoneNumber},
                      Region: {item.Region},
                      City: {item.City}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}

        {selectedOption && (
          <div className='px-4 py-1 flex items-start justify-start gap-2 bg-primary w-full'>
            Selected Payment Option: {selectedOption}
          </div>
        )}

        {/* Render cart items using the CartItemCard component */}
        <p className=' text-teal-950 font-bold items-center justify-center'>ORDER</p>
        {cart &&
          cart.map((cartItem, index) => (
            <motion.div
              key={index}
              {...staggerFadeInOut(index)}
              className='w-full items-center justify-start bg-zinc-200 rounded-md drop-shadow-md px-4 gap-4'
            >
              <img
                src={cartItem?.imageURL}
                className='w-24 min-w-[94px] h-24 object-contain'
                alt=''
              />

              <div className='flex items-center justify-center w-full gap-1'>
                <p className='text-lg text-textColor font-semibold'>
                 Name: {cartItem?.product_name}
                  <span className='text-sm block capitalize text-textColor'>
                  Level:  {cartItem?.product_category}
                  </span>
                </p>
                <p className=' flex items-center justify-center gap-1 text-sm font-semibold text-red-400 ml-auto'>
                 Price: ₵{parseFloat(cartItem?.product_price * cartItem?.quantity).toFixed(2)}
                </p>
              </div>
              <p className='text-lg font-semibold text-textColor'> Description:{cartItem?.product_description}</p>

              <p className='text-lg font-semibold text-textColor'> Quantity:{cartItem?.quantity}</p>
            </motion.div>
          ))}
      </div>

      <div className=''>
        <div className=' flex border w-full top-0 z-50  bg-orange-500  px-5 py-7 left-0 '>
          {/* Add content for the right side here */}
          <table className='table-auto w-full border '>
            <thead>
              <tr>
                <th className='px-4 py-2 text-left'>Summary</th>
                <th className='px-4 py-2 text-right'>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='px-4 py-2'>Total Cart Price</td>
                <td className='px-4 py-2 text-right'>₵{totalCartPrice.toFixed(2)}</td>
              </tr>
              <tr>
                <td className='px-4 py-2'>Delivery Fees</td>
                <td className='px-4 py-2 text-right'>₵{deliveryFees.toFixed(2)}</td>
              </tr>
              <tr>
                <td className='px-4 py-2 font-semibold'>Overall Total</td>
                <td className='px-4 py-2 font-semibold text-right'>
                  ₵{overallTotal.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
          
          </div>
          <p>
          <motion.button
              {...buttonClick}
              onClick={handleConfirmOrder}
              className="w-50 first:items-center justify-center cd  px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-900 transition-all duration-150"
            >
              Confirm Order
            </motion.button>
            </p>
          </div>

      <p className=' font-serif items-center justify-center left-40 right-52'> continue shopping </p>
    </motion.div>

    
  );
};

export default Payment;
