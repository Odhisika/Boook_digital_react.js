import React from 'react'
import {motion } from "framer-motion"
import { buttonClick, staggerFadeInOut } from '../animations'
import { getAllOrders, updateOrderSts, updatePaymentSts } from '../api'
import { setOrders } from '../context/actions/orderActions'
import { useDispatch } from 'react-redux'

const OrdersData = ({index, data, admin}) => {
  const dispatch = useDispatch();

    const handleClick= (orderId, sts)=>{
        updateOrderSts(orderId,sts).then(response =>{
        
          getAllOrders().then((data)=>{
           
              dispatch(setOrders(data));
            })
        })
    }

    const handlePay= (orderId, paymentSts)=>{
      updatePaymentSts(orderId, paymentSts).then(response =>{
      
        getAllOrders().then((data)=>{
         
            dispatch(setOrders(data));
          })
      })
  }
    // Check if data.cart is a string before attempting to parse it
const cartArray = typeof data.cart === 'string' ? JSON.parse(data.cart) : [];

console.log("Parsed cartArray:", cartArray);



      

  return (
  <motion.div {...staggerFadeInOut(index)} className=" w-full flex flex-col items-start justify-start px-3  py-2 border relative border-gray-300 bg-slate-200 drop-shadow-md rounded-md gap-4">
    
    <div className=' w-full flex items-center justify-between'>
    <h1 className='text-xl text-headingColor font-semibold'>Order ID: {data.orderId}</h1>
     <div className=' flex items-center gap-4'>
        <p className=' flex items-center gap-1 text-textColor'>Total: ₵<pan className=' text-headingColor font-bold'>{data.overallTotal}</pan></p>
        <div className=' text-textColor'>Payment status</div>
        {/* <p className=' px-2 py-[2px] text-sm text-headingColor font-semibold capitalize rounded-md bg-red-500 drop-shadow-md'> {data?.paymentSts}</p>
         */}
        <p className={` text-base font-semibold capitalize border bg-gray-300 px-2 py-[2px] rounded-md ${
            (data.paymentSts==="pending" && "text-red-500 bg-red-100")||
            (data.paymentMethod==="paid" && "text-emerald-500 bg-emerald-100")
        }`}>{data?.paymentSts}</p>

        <div className=' text-textColor'>order status</div>
        <p className={` text-base font-semibold capitalize border bg-gray-300 px-2 py-[2px] rounded-md ${
            (data.sts==="preparing" && "text-orange-500 bg-orange-100")||
            (data.sts==="canceled" && "text-red-500 bg-red-100")||
            (data.sts==="delivered" && "text-emerald-500 bg-emerald-100")
        }`}>{data?.sts}</p>

        {admin &&(
          <div className=' items-center justify-center gap-2'>
            <p className=' text-lg text-headingColor font-semibold'> Mark As </p>
            <motion.p
            {...buttonClick}
            onClick={()=>handleClick(data.orderId,"preparing")}
            className={` text-orange-500 text-base font-semibold capitalize border border-gray-300 rounded-md cursor-pointer`}
            >
                Preparing
            </motion.p>
            <motion.p
            {...buttonClick}
            onClick={()=>handleClick(data.orderId,"canceled")}
            className={` text-red-500 text-base font-semibold capitalize border border-gray-300 rounded-md cursor-pointer`}
            >
                Canceled 
            </motion.p>
            <motion.p
            {...buttonClick}
            onClick={()=>handleClick(data.orderId,"delivered")}
            className={` text-emerald-500 text-base font-semibold capitalize border border-gray-300 rounded-md cursor-pointer`}
            >
                Delivered 
            </motion.p>
          </div>
        )}
     </div>
     </div>
<div className=' flex items-center justify-start flex-wrap w-full'>
  <div className=' flex justify-center items-center gap-4'>
  {data.cart?.map((product, idx) => (
          <div key={idx} className='items-center gap-1 flex text-textColor'>
            <img src={product.imageURL} alt={""} className=' w-20 h-20 object-contain' />
            <div className=' flex items-start flex-col'>
            <p>Name: {product.product_name} </p>
            <p> Price: {product.product_price} </p>
            <p> Qty: {product.quantity} </p>

            
          </div>
          </div>
        ))}


       
  </div>
  <p className=' items-end justify-end '>
  <div className=' flex  flex-col gap-2 px-6 ml-auto w-full md:w-460'>
  {data.CustomerDeliveryInfor && (
      <>
        <h1 className=' text-lg text-headingColor font-semibold'>{data.CustomerDeliveryInfor[0].firstName+data.CustomerDeliveryInfor[0].SurName}</h1>
        <p className=' text-base text-headingColor -mt-2'>{data.paymentMethod}</p>
        <p className='text-base text-headingColor -mt-2'>
          {data.CustomerDeliveryInfor[0].AddressLine1},
          {data.CustomerDeliveryInfor[0].AddressLine2},
          {data.CustomerDeliveryInfor[0].Region},
          {data.CustomerDeliveryInfor[0].City},
          {data.CustomerDeliveryInfor[0].PhoneNumber}.
        </p>
      </>
    )}
  <p className='text-sm text-headingColor'>
  Created At: {new Date(data.createdAt._seconds * 1000).toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' })}
</p>

  </div>
  </p>
</div>

    </motion.div>
  )
}

export default OrdersData