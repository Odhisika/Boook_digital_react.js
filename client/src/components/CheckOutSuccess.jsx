import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Header, MainLoader, PaymentDetailsModal } from '../components';
import { bill } from '../asset';
import { fadeInOut } from '../animations';
import { FaAlipay, FaArrowLeft } from '../asset/icons';
import { motion } from 'framer-motion';
import { connect } from 'react-redux'; // Import connect from react-redux


const CheckOutSuccess = ({ user },data) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [currentOrderId, setCurrentOrderId] = useState("");

  useEffect(() => {
    fetchUserOrders();
  }, []); // No need to watch 'user' as it's coming from Redux

  const fetchUserOrders = async () => {
    if (!user || !user.user_id) {
      setError('User information is missing or invalid.');
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.get(
        `http://127.0.0.1:5001/books-digital-4815a/us-central1/app/api/products/orders?userId=${user.user_id}`
      );

      if (response.data.success) {
        const orders = response.data.data;

        // Filter orders to include only those with the user's userId
              const userSpecificOrders = orders
        .filter(order => order.userId === user.user_id)
        .sort((a, b) => b.createdAt._seconds - a.createdAt._seconds); // Sort orders by creation timestamp


        // Set the currentOrderId to the latest order (you can adjust this logic as needed)
        if (userSpecificOrders.length > 0) {
          setCurrentOrderId(userSpecificOrders[0].orderId);
        }
      } else {
        setError('No orders found or an error occurred.');
      }
    } catch (error) {
      console.error('Network or other error:', error);
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const openPaymentModal = () => {
    setIsPaymentModalOpen(true);
  };

  const closePaymentModal = () => {
    setIsPaymentModalOpen(false);
  };

 

  return (
    <main className='w-screen min-h-screen flex items-center justify-start flex-col'>
      <Header />
      <div className='w-full flex flex-col items-center justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24'>
        {isLoading ? (
          <motion.div
            {...fadeInOut}
            className='fixed z-50 inset-0 backdrop-blur-md flex items-center justify-center w-full'
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
            <div>
              {/* Display the orderId of the current order for the user to see */}
              <p className='text-textColor text-lg font-semibold mb-4'>
                Order ID: {currentOrderId}
              </p>
            </div>
            <motion.div>
              
              <button
                onClick={openPaymentModal}
                className='flex items-center justify-center gap-4 text-2xl font-semibold text-textColor px-4 py-2 rounded-md border border-gray-300 hover:shadow-md'
              >
                < FaAlipay className='text-3xl text-textColor' />
                Pay Now
              </button>
             
            </motion.div>
            {isPaymentModalOpen && (
              <PaymentDetailsModal onClose={closePaymentModal}  data={data} orderId={currentOrderId} />
            )}
          </>
        )}
      </div>
    </main>
  );
};

// Connect the component to the Redux store and specify which part of the state contains the user information
const mapStateToProps = (state) => ({
  user: state.user, // Modify this to match the structure of your Redux state
});

export default connect(mapStateToProps)(CheckOutSuccess);
