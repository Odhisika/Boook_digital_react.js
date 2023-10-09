import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getAllOrders, updatePaymentSts } from '../api';
import { setOrders } from '../context/actions/orderActions'; // Import the action you need

const PaymentDetailsModal = ({ onClose, orderId, data }) => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();

  const handlePaidClick = async (orderId, paymentSts) => {
    try {
      
      const existingOrders = await getAllOrders(); 
     
      const orderIndex = existingOrders.findIndex((order) => order.orderId === orderId);

      if (orderIndex !== -1) {
      
        const updatedOrder = { ...existingOrders[orderIndex], paymentSts };

        
        const updatedOrders = [...existingOrders];
        updatedOrders[orderIndex] = updatedOrder;

        dispatch(setOrders(updatedOrders));

        
        setError(' Thank you for your order');
      } else {
        setError('Order not found');
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      setError('Error updating payment status');
    }
  };

  if (!orderId) {
    return null; // Return null or a loading indicator if orderId is null
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-96 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold">Payment Details for Order #{orderId}</h2>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">Mobile Payments</h3>
              <ul>
                <li>MTN MOBILE MONEY - 0593021696</li>
                <li>TIGO CASH - 0575035893</li>
                <li>VODAFONE CASH - 0201988823</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold">Bank Payments</h3>
              <ul>
                <li>ACCESS BANK - 104800000232</li>
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="text-lg font-semibold">NAME ON ACCOUNT</h3>
              <p>NAME: FRANCIS GANYO</p>
            </div>
            <div className="text-red-500">
              <u>Please use the order ID as reference when making payment</u>
            </div>

            {/* "Paid" button */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => handlePaidClick(orderId, 'paid')}
                className="mt-4 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md"
              >
                Mark as Paid
              </button>

              <button
                onClick={onClose}
                className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentDetailsModal;
