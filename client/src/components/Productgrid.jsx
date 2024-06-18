import React from 'react';
import SliderCad from './SliderCad';

const ProductGrid = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((product) => (
        <SliderCad key={product.id} data={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
