"use client"
import { useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import SideBanners from '../courses/_components/SideBanners';
import WelcomeBannerDashboard from './_components/WelcomeBannerDashboard';
import InProgressCourseList from './_components/InProgressCourseList';
import GlobalApi from '@/app/_utils/GlobalApi';

function Dashboard() {
  const {user}=useUser();
  const [userEnrolledCourses,setUserEnrolledCourses]=useState([]);
  useEffect(()=>{
    console.log('user:',user);
    user&&getAllUserEnrolledCourses();
  },[user])

  /**
   * get all user enrolled course list
   */
  const getAllUserEnrolledCourses=()=>{
    GlobalApi.getUserAllEnrolledCourseList(user.primaryEmailAddress.emailAddress).then(resp=>{
      console.log(resp);
      setUserEnrolledCourses(resp.userEnrollCourses);
    })
  }
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 p-5 gap-5 bg-gray-100'>
      {/* Left container */}
      <div className='col-span-1 md:col-span-3 '>
        {/* banner */}
          <WelcomeBannerDashboard user={user}/>
        {/* In progress course list page */}
          <InProgressCourseList userEnrolledCourses={userEnrolledCourses}/>

          
      </div>
      {/* right container  */}
      <div className='hidden md:block p-5 rounded-xl -mt-7 -ml-3'>
        <SideBanners/> 
      </div>
    </div>
  )
}

export default Dashboard