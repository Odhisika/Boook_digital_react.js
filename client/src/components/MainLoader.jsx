import React from 'react';
import './Mainloader.css';

const MainLoader = () => {
  return (
    <div className="main-loader">
      <div className="loader-container">
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
        <div className="loader-square"></div>
      </div>
    </div>
  );
};

export default MainLoader;
