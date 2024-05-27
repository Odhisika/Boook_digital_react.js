import React, { useEffect, useState } from 'react';
import { Header, OrdersData } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../api';
import { ClearOrders, setOrders } from '../context/actions/orderActions';

const UsersOrder = () => {
  const user = useSelector((state) => state.user);
  const orders = useSelector((state) => state.orders);

  const dispatch = useDispatch();

  const [userOrders, setUserOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!orders) {
          const data = await getAllOrders();
          dispatch(setOrders(data));
          setUserOrders(
            data
              .filter((item) => item.userId === user?.user_id)
              .sort((a, b) => b.createdAt._seconds - a.createdAt._seconds)
          );
          dispatch(ClearOrders());
        } else {
          setUserOrders(
            orders
              .filter((data) => data.userId === user?.user_id)
              .sort((a, b) => b.createdAt._seconds - a.createdAt._seconds)
          );
        }
        setLoading(false);
      } catch (error) {
        // Handle the error if necessary
        console.error(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [orders, user?.user_id, dispatch]);

  return (
    <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
      <Header />
      <div className="w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
        {loading ? (
          <h1 className="text-[72px] text-headingColor font-bold">Loading...</h1>
        ) : userOrders && userOrders.length > 0 ? (
          userOrders.map((item, i) => (
            <OrdersData key={i} index={i} data={item} admin={false} />
          ))
        ) : (
          <h1 className="text-[36px] md:text-[72px] text-headingColor font-bold">No Data</h1>
        )}
      </div>
    </main>
  );
};

export default UsersOrder;
