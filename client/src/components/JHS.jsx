import React, { useEffect, useState } from 'react';
import { Header, NavBar, SliderCad } from '../components';
import { useSelector } from 'react-redux';

const JHS = () => {
  const products = useSelector((state) => state.products);
  const [JHS, setJHS] = useState(null);

  useEffect(() => {
    setJHS(
      products?.filter(
        (data) =>
          data.product_category === 'JHS' &&
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
    xl: 4, // Extra-large screens
  };

  return (
    <div>
      <main className=" container w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
        <Header />
        <NavBar />
        <div className={`w-full items-start justify-start flex-wrap flex grid-cols-1 sm:grid-cols-${numColumns.sm} md:grid-cols-${numColumns.md} lg:grid-cols-${numColumns.lg} xl:grid-cols-${numColumns.xl} gap-6`}>
          {JHS &&
            JHS.map((data, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md mt-1">
                <SliderCad key={i} data={data} index={i} />
              </div>
            ))}
        </div>
      </main>
    </div>
  );
};

export default JHS;


