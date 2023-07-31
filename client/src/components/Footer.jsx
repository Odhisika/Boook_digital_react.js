import React, { useEffect, useState } from 'react';
import { footerAPI } from '../utils/styles';

const Footer = () => {
  const [Year, setYear] = useState();
  useEffect(() => {
    const getYear = () => setYear(new Date().getFullYear());
    getYear();
  }, []);

  const { titles, links } = footerAPI; 
  
  const footerStyle = {
    backgroundColor: 'F09809', 
    paddingTop: '7px',
    paddingBottom: '5px',
    background: '#slate-400', 
    width: '100%',
    position: 'absolute',
    bottom: '0',
  };

  return (
    <>
      <footer className={`${footerStyle} w-screen bg-orange-600 px-5 py-7 bottom-0 left-0 `}>
        <div className='nike-container text-slate-200'>
          <div className='grid items-start grid-cols-3 max-w-2xl w-full m-auto md:max-w-none md:gap-5'>
            {titles.map((val, i) => (
              <div key={i} className="grid items-center">
                <h1 className='text-lg lg:text-base md:text-sm uppercase font-semibold'>{val.title}</h1>
              </div>
            ))}
            {links.map((list, i) => (
              <ul key={i} className="grid items-center gap-1">
                {list.map((link, i) => (
                  <li key={i} className="text-sm sm:text-xs">{link.link}</li>
                ))}
              </ul>
            ))}
          </div>
          <div className='mt-5 text-center'>
            <p className='text-sm md:text-center'>Copyright<sup className='text-base font-bold'>&copy;</sup> All Reserved Rights <span className='font-semibold'>Odhisika {Year}</span></p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
