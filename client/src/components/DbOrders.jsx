import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders } from '../api';
import { setorders } from '../context/actions/orderActions';
import {OrdersData} from '../components';

const DbOrders = () => {
  const orders = useSelector((state) => state.orders);
  const dispatch= useDispatch();

  useEffect(()=>{
    if (!orders){
      getAllOrders().then((data)=>{
        dispatch(setorders(data));
      })
    }
  },[])
  return (
    <div className='flex items-center justify-center flex-col w-full pt-6 gap-4'>{orders ? (<>{orders.map((item, i )=>(<OrdersData key={i} index={i} data={item} admin={true}/>))}</>) :(<><h1 className=' text-[72px] text-headingColor font-bold'> No Data</h1></>)}</div>
  )
}

export default DbOrders




