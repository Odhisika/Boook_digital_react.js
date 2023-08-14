import React, { useEffect, useState } from 'react'
import {Header, NavBar, SliderCad} from '../components'
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../asset/css/swiperStyles.css";
import "swiper/css/bundle";

const SHS = () => {
  const products =useSelector((state)=>state.products)
  const [SHS, setSHS] = useState(null)

  useEffect(()=>{
    setSHS(products?.filter((data)=>data.product_category ==="SHS"));
    console.log( SHS);
},[products]);

  return (
<div>
   <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
     <Header/>       
     <NavBar/>
     <div className=" w-full pt-24">
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
      >
      {  SHS && SHS.map((data, i)=>(
        <SwiperSlide key={i}>
         <SliderCad key={i} data={data} index={i}/>
        </SwiperSlide>
      ))}
      </Swiper>
        </div>
   </main>
</div>

  )
}

export default SHS;