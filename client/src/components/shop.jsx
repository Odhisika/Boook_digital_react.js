import React, { useState } from 'react';
import { Header } from "../components";

const categories = {
  provisions: ['Milk', 'Bread', 'Butter'],
  Bags: ['Philips Iron', 'Panasonic Iron'],
  clothing : ['Red T-shirt', 'Blue T-shirt'],
  Footwear: ['Geometry Box', 'Compass'],
  Toiletories:["T-roll, ri j"],
  Electrical : [" aekjkdfk , eh a"],
  Stationary :["llkjdf a, eak, "]
};

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('provisions');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content area */}
      <div className="flex flex-1 mt-16">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="relative w-1/4 bg-gray-200 p-4 transition-all duration-300">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <ul>
              {Object.keys(categories).map((category) => (
                <li key={category} className="mb-2">
                  <button
                    className="w-full text-left p-2 bg-blue-500 text-white rounded"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
            <button 
              className="absolute bottom-20 right-0 p-2 bg-red-500 text-white rounded-full transform -translate-x-1/2"
              onClick={toggleSidebar}
            >
              &larr;
            </button>
          </aside>
        )}

        
        {!sidebarOpen && (
          <button 
            className="fixed top-20  flex  bg-blue-500 text-white rounded-full z-50"
            onClick={toggleSidebar}
          >
            &#9776;
          </button>
        )}

        {/* Main Content */}
        <main className={`flex-1 p-4 ${sidebarOpen ? 'ml-4' : 'ml-0'}`}>
          <h2 className="text-2xl font-bold mb-4">
            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </h2>
          <ul>
            {categories[selectedCategory].map((item, index) => (
              <li key={index} className="mb-2 p-2 bg-white rounded shadow">
                {item}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default Shop;
