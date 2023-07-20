import React from 'react'
import {Header, NavBar, PHeader } from '../components'
import { NavLink } from 'react-router-dom'

const KG = () => {
// const showPrimaryHeader = true;

  return (
    <div>
   <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
     <Header/>       
     <NavBar/>
     <PHeader/>
     
    {/* {showPrimaryHeader?  <PrimayHeader />:null}  */}
    {/* Conditionally render the SecondHeader */}

     <div className=" w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
      KG Boooks
      </div>
   </main>
</div>

  )
}

export default KG