import React from 'react'
import { DBRightSection, DbLeftSection } from '../components'

const Dashboard = () => {
  return (
    <div className=' w-screen h-screen flex items-center bg-primary'>
      <DbLeftSection/> 
      <DBRightSection/>
    </div>
  )
}

export default Dashboard
