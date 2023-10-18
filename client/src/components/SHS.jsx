import React, { useEffect, useState } from 'react';
import { Header, NavBar, SliderCad } from '../components';
import { useSelector } from 'react-redux';

const SHS = () => {
  const products = useSelector((state) => state.products);
  const [displayedBooks, setDisplayedBooks] = useState(6); // Number of books to display initially
  const [showAllBooks, setShowAllBooks] = useState(false);
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    if (products) {
      const filteredBooks = products.filter(
        (data) =>
          data.product_category === 'SHS' &&
          data.product_name &&
          data.product_description &&
          data.product_price &&
          data.imageURL
      );
      setAllBooks(filteredBooks);
    }
  }, [products]);

  const handleExploreMore = () => {
    setShowAllBooks(true);
    setDisplayedBooks(allBooks.length);
  };

  const handleViewLess = () => {
    setShowAllBooks(false);
    setDisplayedBooks(6);
  };

  const numColumns = {
    sm: 1,
    md: 1,
    lg: showAllBooks ? 'auto-fill' : 'minmax(300px, 1fr)',
    xl: showAllBooks ? 'auto-fill' : 'minmax(300px, 1fr)',
  };

  return (
    <div>
      <main className="container w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
        <Header />
        <NavBar />
        <div className={`w-full items-start justify-start flex-wrap flex grid-cols-1 sm:grid-cols-${numColumns.sm} md:grid-cols-${numColumns.md} lg:grid-cols-${numColumns.lg} xl:grid-cols-${numColumns.xl} gap-6`}>
          {allBooks.slice(0, displayedBooks).map((data, i) => (
            <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md mt-1">
              <SliderCad key={i} data={data} index={i} />
            </div>
          ))}
        </div>
        {!showAllBooks && allBooks.length > +1 && (
          <button className='bg-red-500 text-white px-4 py-2 rounded-lg inline-block hover:bg-red-600 transition-colors' onClick={handleExploreMore}>Browse more books</button>
        )}
        {showAllBooks && (
          <button className='bg-red-500 text-white px-4 py-2 rounded-lg inline-block hover:bg-red-600 transition-colors' onClick={handleViewLess}>View less</button>
        )}
      </main>
    </div>
  );
};

export default SHS;
