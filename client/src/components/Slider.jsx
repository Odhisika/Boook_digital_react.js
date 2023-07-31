import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "../asset/css/swiperStyles.css";

import "swiper/css/bundle";
import { useSelector } from 'react-redux';
import {SliderCad} from '../components';


const Slider = () => {
    const products =useSelector((state)=>state.products)
    const [JHS, setJHS] = useState(null)

    useEffect(()=>{
        setJHS(products?.filter((data)=>data.product_category ==="JHS"));
        console.log(JHS);
    },[products]);
  return (

    <div className=" w-full pt-24">
      <Swiper
        slidesPerView={4}
        centeredSlides={false}
        spaceBetween={30}
        grabCursor={true}
        className="mySwiper"
      >
      { JHS && JHS.map((data, i)=>(
        <SwiperSlide key={i}>
         <SliderCad key={i} data={data} index={i}/>
        </SwiperSlide>
      ))}
      </Swiper>
        </div>
  )
}

export default Slider

