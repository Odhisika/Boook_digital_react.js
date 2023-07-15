import React from 'react'
import  {motion } from "framer-motion"
import {Slider} from '../components'

const HomeSlider = () => {
  return (
    <motion.div className=" w-full items-start justify-start flex flex-col">
        <div className=" w-full items-center justify-between flex">
            <div className=" flex flex-col items-start justify-start gap-1">
                <p className=" text-headingColor text-2xl font-bold">
                   Our Best Selling Acadamic Books
                </p>
                <div className=" w-40 h-1 rounded-md bg-orange-500"></div>
            </div>
        </div>

        <Slider/>

    </motion.div>
  )
}

export default HomeSlider