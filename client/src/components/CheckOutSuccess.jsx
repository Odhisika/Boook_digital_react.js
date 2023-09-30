import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header, MainLoader, PaymentDetailsModal } from '../components';
import { bill } from '../asset';
import { buttonClick, fadeInOut } from '../animations';
import { FaArrowLeft } from '../asset/icons';
import { motion } from 'framer-motion';
import { updateOrderSts, getAllOrders, createOrder } from '../api';
import { setOrders } from '../context/actions/orderActions';

const CheckOutSuccess = ({data}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [error, setError] = useState(null);
  

  const dispatch = useDispatch();

  // Access the orders array from the Redux store
  const orders = useSelector((state) => state.orders && state.orders.orders);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getAllOrders(); 
        dispatch(setOrders(ordersData)); 
  
        // Find the orderId you're interested in (for example, the first order)
        const orders = ordersData && ordersData.length > 0 ? ordersData[0] : null;
  
        if (orders) {
          setIsLoading(false); // Stop loading when orderId is found
        } else {
          setError('No orders found.'); // Handle the case where there are no orders
          setIsLoading(false); // Stop loading
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Error fetching orders.'); // Handle any errors
        setIsLoading(false); // Stop loading
      }
    };
  
    fetchOrders(); // Call the fetchOrders function
  
    // Clean up the effect (e.g., clear timeouts, intervals, etc.) if needed
    return () => {
      // Clean up code here if necessary
    };
  }, [dispatch, orders]);

  const openPaymentModal = () => {
    console.log('Order ID:', data.orderId);
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };
  
  // Rest of your component code...

  return (
    <main className='w-screen min-h-screen flex items-center justify-start flex-col'>
      <Header />
      <div className='w-full flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24'>
        {isLoading ? (
          <motion.div
            {...fadeInOut}
            className='fixed z-50 inset-0  backdrop-blur-md flex items-center justify-center w-full'
          >
            <MainLoader />
          </motion.div>
        ) : error ? (
          <div className='text-red-500'>{error}</div>
        ) : (
          <>
            <img src={bill} className='w-full object-contain md:w-656' alt='' />
            <h1 className='text-[35px] text-headingColor font-bold'>
              You have placed your order successfully
            </h1>
            <motion.div {...buttonClick}>
              <button
                onClick={() => setIsPaymentModalOpen(true)}
                className='flex items-center justify-center gap-4 text-2xl font-semibold text-textColor px-4 py-2 rounded-md border border-gray-300 hover:shadow-md'
              >
                <FaArrowLeft className='text-3xl text-textColor' />
                Pay Now
              </button>
            </motion.div>
            {/* Payment Details Modal */}
            {isPaymentModalOpen && (
            <PaymentDetailsModal onClose={closePaymentModal} />
              )}
          </>
        )}
      </div>
    </main>
  );
};

export default CheckOutSuccess;
