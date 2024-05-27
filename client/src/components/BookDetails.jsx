import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { buttonClick } from '../animations';
import { motion } from 'framer-motion';
import { IoBasket } from '../asset/icons';
import { useDispatch, useSelector } from 'react-redux';
import { addNewItemToCart, getAllCartItems } from '../api';
import { alertNull, alertSuccess } from '../context/actions/alertActions';
import { setCartItems } from '../context/actions/cartActions';
import Header from './Header';
import {Cart} from '../components';

const BookDetails = () => {
  const { productid } = useParams();
  const products = useSelector((state) => state.products);
  const isCart = useSelector((state)=>state.isCart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [bookData, setBookData] = useState("");
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const selectedProduct = products.find((product) => product.productid.toString() === productid.toString());

    if (selectedProduct) {
      setBookData(selectedProduct);

      const relatedBooksInCategory = products.filter((product) => product.product_category === selectedProduct.product_category);
      const filteredRelatedBooks = relatedBooksInCategory.filter((relatedBook) => relatedBook.productid !== selectedProduct.productid);

      setRelatedBooks(filteredRelatedBooks);
    } else {
      console.error(`Product with productid ${productid} not found.`);
    }
    if (products.length === 0) {
      // Handle the case where products is empty, e.g., show a loading message
      return;
    }

  }, [productid, products]);

  if (!bookData) {
    return <div>Loading...</div>;
  }

  const SendToCart = () => {
    addNewItemToCart(user?.user_id).then((res) => {
      dispatch(alertSuccess('Added to cart'));
      getAllCartItems(user?.user_id).then((items) => {
        dispatch(setCartItems(items));
      });
      setInterval(() => {
        dispatch(alertNull());
      }, 3000);
    });
  };

  const handleMouseEnter = (index) => {
    const updatedRelatedBooks = [...relatedBooks];
    updatedRelatedBooks[index].isHovered = true;
    setRelatedBooks(updatedRelatedBooks);
  };

  const handleMouseLeave = (index) => {
    const updatedRelatedBooks = [...relatedBooks];
    updatedRelatedBooks[index].isHovered = false;
    setRelatedBooks(updatedRelatedBooks);
  };

  return (
    <>
      <Header className='w-screen min-h-screen flex items-center justify-start flex-col bg-primary' />
      <div className="grid grid-cols-1 overscroll-auto lg:grid-cols-2 gap-8 p-8 mt-28">
        <div>
          <img src={bookData.imageURL} alt={bookData.product_name} className="w-full h-fit" />
        </div>
        <div className="flex flex-col justify-center"> {/* Center the content */}
          <h1 className="text-2xl font-semibold">{bookData.product_name}</h1>
          <p className="text-lg text-gray-700">Price: ₵{bookData.product_price}</p>
          <p className="text-lg text-gray-700">Category: {bookData.product_category}</p>
          <p className="text-lg text-gray-700">Description: {bookData.product_description}</p>

          <motion.div>
            <div
              {...buttonClick}
              onClick={SendToCart}
              className="w-full px-4 py-2 rounded-md bg-blue-400 cursor-pointer text-white text-xl capitalize hover:bg-orange-900 transition-all duration-150">
              Add to Cart
            </div>
          </motion.div>
        </div>
      </div>
      <div>
      <h2 className="text-xl font-semibold mb-4">Related Books</h2>
      </div>
      <div className="w-screen grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4  p-8 mt-4">
        {relatedBooks.map((relatedBook, index) => (
          <div key={relatedBook.productid} className=" hover:drop-shadow-lg backdrop-blur-md rounded-xl p-4">
            <img src={relatedBook.imageURL} className="w-full h-auto object-contain" alt="" />
            <div className="mt-4">
              <p className="text-xl text-headingColor font-semibold">{relatedBook.product_name}</p>
              <p className="text-headingColor">{relatedBook.product_description}</p>
              <p className="text-lg font-semibold text-red-500 mt-2">₵{parseFloat(relatedBook.product_price).toFixed(2)}</p>
              <motion.div
          {...buttonClick}
          className="w-full flex items-center justify-center"
        >
          <button
            {...buttonClick}
            onClick={SendToCart}
            className="bg-blue-500 cursor-pointer font-bold text-white px-4 py-2 rounded shadow"
          >
            Add to Cart
          </button>
          <IoBasket className="text-2xl text-primary cursor-pointer" />
        </motion.div>
            </div>
          </div>
        ))}
       

      </div>
    </>
    

  );
};

export default BookDetails;
