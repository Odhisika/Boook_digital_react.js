import React, { useState } from 'react';
import { Header } from "../components";

const categories = {
  provisions: ['Milk', 'Bread', 'Butter'],
  irons: ['Philips Iron', 'Panasonic Iron'],
  tshirt: ['Red T-shirt', 'Blue T-shirt'],
  mathset: ['Geometry Box', 'Compass']
};

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('provisions');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content area */}
      <div className="flex flex-1 mt-16">
        {/* Sidebar */}
        <aside className="w-1/4 bg-gray-200 p-4">
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
        </aside>

        {/* Main Content */}
        <main className="w-3/4 p-4">
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
