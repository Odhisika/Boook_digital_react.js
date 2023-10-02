import React, { useEffect, useState } from 'react';
import { Header, NavBar, SliderCad } from '../components';
import { useSelector } from 'react-redux';

const JHS = () => {
  const products = useSelector((state) => state.products);
  const [KG, setKG] = useState(null);

  useEffect(() => {
    setKG(
      products?.filter(
        (data) =>
          data.product_category === 'KG' &&
          data.product_name &&
          data.product_description &&
          data.product_price &&
          data.imageURL
      )
    );
  }, [products]);

  // Define the number of columns based on screen size
  const numColumns = {
    sm: 1, // Small screens
    md: 2, // Medium screens
    lg: 3, // Large screens
    xl: 3, // Extra-large screens
  };

  return (
    <div>
      <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
        <Header />
        <NavBar />
        <div
          className={`w-full items-center justify-evenly  flex-wrap gap-4 mt-12 pt-24 grid grid-cols-1 sm:grid-cols-${numColumns.sm} md:grid-cols-${numColumns.md} lg:grid-cols-${numColumns.lg} xl:grid-cols-${numColumns.xl} gap-4`}
        >
          {KG &&
            KG.map((data, i) => (
              <SliderCadCard key={i} product={data} />
            ))}
        </div>
      </main>
    </div>
  );
};

const SliderCadCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <SliderCad data={product} />
    </div>
  );
};

export default JHS;
