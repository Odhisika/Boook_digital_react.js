import { useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { SliderCad } from '../components';

const Search = () => {
  const products = useSelector((state) => state.products);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products && products.length && (searchQuery !== '' || selectedCategory !== '')) {
      const filteredProducts = products.filter((product) => {
        const nameMatch = product.product_name && product.product_name.toLowerCase().includes(searchQuery.toLowerCase());
        const categoryMatch = product.product_category && product.product_category.toLowerCase() === selectedCategory.toLowerCase();
        
        
        const publisherMatch = product.product_publishers && product.product_publishers.toLowerCase().includes(searchQuery.toLowerCase());
        const authorMatch = product.product_authors && product.product_authors.toLowerCase().includes(searchQuery.toLowerCase());
        const descriptionMatch = product.product_description && product.product_description.toLowerCase().includes(searchQuery.toLowerCase());
  
        if (searchQuery === '' && selectedCategory === '') return false;
  
        if (searchQuery === '') return categoryMatch || publisherMatch || authorMatch || descriptionMatch;
  
        if (selectedCategory === '') return nameMatch || publisherMatch || authorMatch || descriptionMatch;
  
        return (nameMatch || publisherMatch || authorMatch || descriptionMatch) && categoryMatch;
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
          className="w-full md:w-96 bg-stone-300 px-6 py-2 mt-8 rounded-md focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </form>
      {searchQuery !== '' || selectedCategory !== '' ? (
        <div className="flex flex-col md:flex-row items-center justify-evenly flex-wrap gap-4 mt-12">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((data, i) => (
              <SliderCad
                key={i}
                data={data}
                index={i}
               
                publishers={data.product_publishers}
                authors={data.product_authors}
                description={data.product_description}
              />
            ))
          ) : (
            <h1 className='text-[35px] text-headingColor font-bold'>No Books found</h1>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Search;
