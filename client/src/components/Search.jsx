import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { SliderCad } from '../components';

const Search = () => {
  const products = useSelector((state) => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);


 
  
  useEffect(() => {
    if (products && (searchQuery !== '' || selectedCategory !== '')) {
      const filteredProducts = products.filter((product) => {
        const nameMatch = product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
        const categoryMatch = product.product_category.toLowerCase() === selectedCategory.toLowerCase();

        if (searchQuery === '' && selectedCategory === '') return false;

        if (searchQuery === '') return categoryMatch;

        if (selectedCategory === '') return nameMatch;

        return nameMatch && categoryMatch;
      });

      setFilteredProducts(filteredProducts);
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery, selectedCategory, products]);

  return (
    <div>
      <form action="/" method="get" className="flex flex-col md:flex-row items-center gap-4">
        <input
          type="text"
          id="header-search"
          placeholder="Search products"
          name="s"
          className="w-full md:w-96 bg-orange-300 px-6 py-2 mt-8 rounded-md focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <select
          className="w-full md:w-40 bg-orange-300 px-4 py-2 mt-8 rounded-md focus:outline-none"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="kindagerten">KG</option>
          <option value="primary">Primary</option>
          <option value="jhs">JHS</option>
          <option value="shs">SHS</option>
        </select> */}
      </form>
      {searchQuery !== '' || selectedCategory !== '' ? (
        <div className="flex flex-col md:flex-row items-center justify-evenly flex-wrap gap-4 mt-12">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((data, i) => <SliderCad key={i} data={data} index={i} />)
          ) : (
            <h1 className='text-[35px] text-headingColor font-bold'>No Books found</h1>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Search;
