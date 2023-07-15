import React from 'react'
import {DbHeader, DbHome, DbItems, DbNewItems, DbOrders, DbUsers} from "../components"
import { Route, Routes } from 'react-router-dom'

const DBRightSection = () => {
  return (
    <div className=" flex flex-1 py-12 px-12 flex-col h-full ">
        <DbHeader />
       <div className=" flex flex-col  flex-1 overflow-y-scroll scrollbar-none">
        <Routes>
          <Route path="/home" element={<DbHome/>}/>
          <Route path="/items" element={<DbItems/>}/>
          <Route path="/orders" element={<DbOrders/>}/>
          <Route path="/newItems" element={<DbNewItems/>}/>
          <Route path="/users" element={<DbUsers/>}/>
        </Routes>
       </div>
    </div>
  )
}

export default DBRightSection
