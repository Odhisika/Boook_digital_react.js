import React from 'react'
import {motion } from "framer-motion"
import { buttonClick, staggerFadeInOut } from '../animations'

const OrdersData = ({index, data, admin}) => {

    const handleClick= (OrderId, sts)=>{

    }

  return (
  <motion.div {...staggerFadeInOut(index)} className=" w-full flex flex-col items-start justify-start px-3  py-2 border relative border-gray-300 bg-slate-200 drop-shadow-md rounded-md gap-4">
    
    <div className=' w-full flex items-center justify-between'>
     <h1 className=' text-xl text-headingColor font-semibold'>Orders</h1>
     <div className=' flex items-center gap-4'>
        <p className=' flex items-center gap-1 text-textColor'>Total: ₵<pan className=' text-headingColor font-bold'>{data?.total}</pan></p>
        <p className=' px-2 py-[2px] text-sm text-headingColor font-semibold capitalize rounded-md bg-emerald-400 drop-shadow-md'>{data?.status}</p>
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
            onClick={()=>handleClick(data.OrderId,"preparing")}
            className={` text-orange-500 text-base font-semibold capitalize border border-gray-300 rounded-md cursor-pointer`}
            >
                Preparing
            </motion.p>
            <motion.p
            {...buttonClick}
            onClick={()=>handleClick(data.OrderId,"canceled")}
            className={` text-red-500 text-base font-semibold capitalize border border-gray-300 rounded-md cursor-pointer`}
            >
                Canceled 
            </motion.p>
            <motion.p
            {...buttonClick}
            onClick={()=>handleClick(data.OrderId,"delivered")}
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
            {data?.items && data.items.map((item,j)=>(
              <motion.div {...staggerFadeInOut(j)} key={j} className=" items-center justify-center gap-1">
                <img src={item.imageURL} className=' w-10 h-10 object-contain' alt="" />
                
                <div className=' flex items-start flex-col'>
                    <p className=' text-base font-semibold text-headingColor'>{item.product_name}</p>
                    <div className=' flex items-center gap-2'>
                        <p className=' text-sm text-textColor'>{" "}Qty:{item.quantity}</p>
                        <p className=' items-center gap-1 flex text-textColor'>₵{parseFloat(item.product_price).toFixed(2)}</p>
                    </div>
                </div>
              </motion.div>
            ))}
        </div>
        <div className=' flex items-center justify-center flex-col gap-2 px-6 ml-auto w-full md:w-460'>
            <h1 className=' text-lg text-headingColor font-semibold'> {data.shipping_details.name}</h1>
            <p className=' text-base text-headingColor -mt-2'> {data.customer.email}{data.customer.phone}</p>
            <p className='text-base text-headingColor -mt-2'>
                {data.shipping_details.address.line1},
                {data.shipping_details.address.line2},
                {data.shipping_details.address.country},
                {data.shipping_details.address.state},
                {data.shipping_details.address.postal_code},
            </p>
        </div>
     </div>
    </motion.div>
  )
}

export default OrdersData