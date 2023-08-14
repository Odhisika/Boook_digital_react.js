import React, { useEffect, useState } from 'react'
import {Header, NavBar, SliderCad} from '../components'
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../asset/css/swiperStyles.css";
import "swiper/css/bundle";

const KG = () => {
  const products =useSelector((state)=>state.products)
  const [KG, setKG] = useState(null)

  useEffect(()=>{
    setKG(products?.filter((data)=>data.product_category ==="KG"));
    console.log( KG);
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
      {  KG && KG.map((data, i)=>(
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


export default KG