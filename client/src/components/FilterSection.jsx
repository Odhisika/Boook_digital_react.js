import React, { useState } from 'react';
import { motion } from "framer-motion";
import { staggerFadeInOut } from "../animations";
import SliderCad from './SliderCad';
import { statuses } from "../utils/styles";
import { useSelector } from 'react-redux';
import { FaWarehouse } from '../asset/icons';

const FilterSection = () => {
  const [category, setCategory] = useState("SHS");
  const products = useSelector(state => state.products);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const filteredProducts = products ? products.filter(data => data.product_category === category) : [];

  return (
    <motion.div className="w-full flex flex-col items-start justify-start bg-blend-color-burn p-4 sm:p-8">
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start justify-start gap-1">
          <p className="text-headingColor text-xl sm:text-2xl font-bold">
            Market Place 
          </p>
          <div className="w-20 h-1 rounded-md bg-orange-500 sm:w-40"></div>
        </div>
      </div>

      <div className="w-full overflow-x-scroll pt-6 flex items-center justify-center gap-6 py-8">
        {statuses &&
          statuses.map((data, i) => (
            <FilterCad
              key={i}
              data={data}
              category={category}
              setCategory={handleCategoryChange}
              index={i}
            />
          ))}
      </div>
      <div className="w-full flex flex-wrap items-center justify-center gap-4 mt-8 sm:mt-12">
        {filteredProducts.map((data, i) => (
          <SliderCad key={i} data={data} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

export const FilterCad = ({ data, index, category, setCategory }) => {
  const handleClick = () => {
    setCategory(data.category);
  };

  return (
    <motion.div
      key={index}
      {...staggerFadeInOut(index)}
      className={`group w-40 min-w-[96px] cursor-pointer py-4 sm:w-56 sm:min-w-[128px] py-6 ${
        category === data.category ? "bg-orange-500" : "bg-primary"
      } hover:bg-orange-500 shadow-md flex flex-col items-center justify-center gap-2 sm:gap-4`}
      onClick={handleClick}
    >
      <div
        className={`w-8 h-8 rounded-full shadow-md flex items-center justify-center group-hover:bg-primary ${
          category === data.category ? "bg-primary" : "bg-orange-500"
        } sm:w-10 sm:h-10`}
      >
        <FaWarehouse
          className={`${
            category === data.category ? "text-orange-500" : "text-primary"
          } group-hover:text-orange-500`}
        />
      </div>

      <p
        className={`text-sm sm:text-base font-semibold ${
          category === data.category ? "text-primary" : "text-textColor"
        } group-hover:text-primary`}
      >
        {data.title}
      </p>
    </motion.div>
  );
};

export default FilterSection;
