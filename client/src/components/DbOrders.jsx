import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../api';
import { setOrders } from '../context/actions/orderActions';
import { OrdersData } from '../components';

const DbOrders = () => {
  const orders = useSelector((state) => state.orders); // Ensure it's an array
  const dispatch = useDispatch();

  useEffect(() => {
    if (!orders.length) {
      fetchOrders();
    }
  }, [orders, dispatch]);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      if (response.success) {
        // Sort orders in ascending order based on createdAt timestamp
        const sortedOrders = response.orders.sort((a, b) => {
          return new Date(a.createdAt.toDate()) - new Date(b.createdAt.toDate());
        });
        dispatch(setOrders(sortedOrders));
      } else {
        console.error('Error fetching orders:', response.error);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  return (
    <div className='flex items-center justify-center flex-col w-full pt-6 gap-4'>
      {orders.length ? (
        <>
          {orders.map((item, i) => (
            <OrdersData key={i} index={i} data={item} admin={true} />
          ))}
        </>
      ) : (
        <>
          <h1 className='text-[72px] text-headingColor font-bold'>No Data</h1>
        </>
      )}
    </div>
  );
};

export default DbOrders;
