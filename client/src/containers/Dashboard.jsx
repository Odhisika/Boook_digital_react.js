import React from 'react'
import { DBRightSection, DbLeftSection } from '../components'

const Dashboard = () => {
  return (
    <div className=' w-screen h-screen flex items-center bg-blue-50'>
      <DbLeftSection/> 
      <DBRightSection/>
    </div>
  )
}

export default Dashboard
