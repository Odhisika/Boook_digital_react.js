import React from 'react'
import {Header, NavBar} from '../components'

const SHS = () => {
  return (
    <div>
        <main className="w-screen min-h-screen flex items-center justify-start flex-col bg-primary">
     <Header/>       
    <NavBar/>
    <div className=" w-full flex flex-col items-start justify-center mt-40 px-6 md:px-24 2xl:px-96 gap-12 pb-24">
      Senior High School Books
      
      </div>
    </main>
    </div>
    
  )
}

export default SHS