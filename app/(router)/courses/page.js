"use client"
import React from 'react'
import WelcomeBanner from './_components/WelcomeBanner'
import CourseList from './_components/CourseList'
import SideBanners from './_components/SideBanners'

function Courses() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 p-5 gap-5'>
      {/* Left container */}
      <div className='col-span-3 '>
          {/* banner */}
          <WelcomeBanner/>

          {/* course list section  */}
          <CourseList/>
      </div>
      {/* right container  */}
      <div className='hidden md:block p-5 rounded-xl -mt-7 -ml-3'>
        <SideBanners/> 
      </div>
    </div>
  )
}

export default Courses