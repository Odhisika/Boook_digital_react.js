import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrders } from '../context/actions/orderActions';

const PaymentDetailsModal = ({ onClose, orderId }) => {
  const [error, setError] = useState(null);

  // You don't need to fetch orders here, as you already have them in props
  const orders = useSelector((state) => state.orders && state.orders.orders);
  const dispatch = useDispatch();

  useEffect(() => {
    // Ensure that orders is not null before accessing its properties
    if (orders && orders.length > 0) {
      const order = orders.find((order) => order.orderId === orderId);

      if (order) {
        // Display payment details for the specific order
        // You can access order properties like order.paymentMethod, order.userId, etc.
      } else {
        setError('Order not found.');
      }
    } else {
      setError('No orders found.');
    }
  }, [orderId, orders]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white w-96 p-4 rounded-lg">
        <h2 className="text-2xl font-semibold">Payment Details for Order #{orderId}</h2>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          // Render payment details for the specific order here
          // You can access order properties like order.paymentMethod, order.userId, etc.
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
              <p>NAME: FRANICS GANYO</p>
            </div>
          </>
        )}

        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md">
          Close
        </button>
      </div>
    </div>
  );
};

export default PaymentDetailsModal;
