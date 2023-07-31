import React, { useEffect } from 'react'
import { Header, Home, HomeSlider,FilterSection, Cart, NavBar, KG, JHS, SHS, Primary, Footer,  } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../api'
import { setAllProducts } from '../context/actions/productActions'


const Main = () => {
  const products =useSelector((state)=>state.products);
  const isCart = useSelector((state)=>state.isCart);
  const dispatch= useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);
  return <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
    <Header />
    <NavBar/>
    
    <div className=" w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
      <Home/>
      <HomeSlider/>
      <FilterSection/>
      <div id="kindagerten"><KG/></div>
      <div id="primary"><Primary/></div>
      <div id="jhs"> <JHS/></div>
      <div id="shs"><SHS/></div>
    </div>
    <Footer/>
    {isCart && <Cart/>}
  </main>
  
}

export default Main
