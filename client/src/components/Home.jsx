import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { delivery, heroBg } from '../asset'

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';



const images = [
    'https://www.brookings.edu/wp-content/uploads/2020/07/shutterstock_592676366_small.jpg?resize=1500,999',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiJkT7-fbYti9ll1TSTldDRb9NMqfh_7dDkA&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1PSVvHcoSsy_GE4plJ70tlJ20elQXWb73Ag&usqp=CAU',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjw0zW0sZm-Q3rS9F6OF1pVnCUtJJYlhallg&usqp=CAU',
    'https://spana.org/wp-content/uploads/2019/03/RS209379_DSC_0599-1920x900.jpg.webp',
    'https://img.freepik.com/free-photo/young-african-students-wearing-facemasks-holding-books-phones-campus_181624-45912.jpg?w=740&t=st=1697522362~exp=1697522962~hmac=e58a4ee975f5b7019caf5b2170b3246f43d892b388ef39b67bc946da45e25c88',
    // Add more image URLs as needed
  ];

const Home = () => {

    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImage((currentImage) => (currentImage + 1) % images.length);
      }, 2000); 
  
      return () => clearInterval(interval);
    }, []);
   
  return (
   <motion.div className=' w-full grid grid-cols-1 md:grid-cols-2 gap-4  '>
    <div className=" flex flex-col items-start justify-start gap-6">
      
          
      

        <div className=' px-4 py-1 flex items-center justify-center gap-2 bg-orange-100 rounded-full'>
            <p className=' text-lg font-semibold text-orange-500'> Fast Delivery</p>
            <div className=" w-10 h-10 flex items-center justify-center rounded-full bg-primary shadow-md">
                <img src={delivery} alt="" className=' w-full h-full object-contain' />
            </div>

       
        </div>

        <p className=" text-[40px] text-headingColor md:text-[52px] font-sans font-extrabold tracking-wider"> Buy our High Quality Books   <span className=' text-orange-600'> And Get It Delivered In Your City  </span></p>

    </div>
    

    <div className=" py-2 flex-1 flex items-center justify-end relative">
        
        <div className="py-2 flex-1 flex items-center justify-end relative">
        
        <div className="w-full md:w-460 ml-0">
          <img
            src={images[currentImage]}
            alt={`Slider ${currentImage}`}
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
       </div>
       </div>
      

   </motion.div>
  )
}

export default Home