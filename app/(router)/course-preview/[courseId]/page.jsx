"use client"
import { useEffect, useState } from 'react';
import CourseVideoDesciption from './_components/CourseVideoDesciption';
import GlobalApi from '@/app/_utils/GlobalApi';
import CourseEnrollSection from './_components/CourseEnrollSection';
import CourseContentSection from './_components/CourseContentSection';
import { useUser } from '@clerk/nextjs';

function CoursePreview({params}) {

  const {user}=useUser();
  const [courseInfo,setCourseInfo]=useState();
  const [isUserAlreadyEnrolled,setIsUserAlreadyEnrolled]=useState();
  useEffect(()=>{
    if(params){
    getCourseInfoById();
    }
  },[params])

  useEffect(()=>{
    courseInfo&&user&&checkUserEnrolledToCourse();
  },[courseInfo,user])

  // getting course info by slug name 
  const getCourseInfoById=()=>{
    GlobalApi.getCourseById(params?.courseId).then(resp=>{
      setCourseInfo(resp?.courseList);
    })
  }
  //to check user already enrolled to course
  const checkUserEnrolledToCourse=()=>{
    GlobalApi.checkUserEnrolledToCourse(courseInfo.slug,user.primaryEmailAddress.emailAddress)
    .then(resp=>{
      if(resp?.userEnrollCourses)
      {
        setIsUserAlreadyEnrolled(resp?.userEnrollCourses[0]?.id);
      }
  })
}

  return courseInfo&&(
    <div className='grid grid-cols-1 md:grid-cols-3 p-5 gap-3'>
        {/* Video description & title  */}
        <div className='col-span-2 bg-white p-3'>
          <CourseVideoDesciption courseInfo={courseInfo}/>
        </div>
        {/* Course content  */}
        <div>
              <CourseEnrollSection courseInfo={courseInfo}
              isUserAlreadyEnrolled={isUserAlreadyEnrolled}/>

              <CourseContentSection courseInfo={courseInfo}
              isUserAlreadyEnrolled={isUserAlreadyEnrolled}/>
        </div>
    </div>
  )
}

export default CoursePreview