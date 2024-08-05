"use client";
import GlobalApi from '@/app/_utils/GlobalApi';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import CourseVideoDesciption from '../../course-preview/[courseId]/_components/CourseVideoDesciption';
import CourseContentSection from '../../course-preview/[courseId]/_components/CourseContentSection';
import { toast } from 'sonner';

function WatchCourse({ params }) {
  const { user } = useUser();
  const [courseInfo, setCourseInfo] = useState([]);
  const [completedChapter,setCompletedChapter]=useState([])
  const [activeChapterIndex,setActiveChapterIndex]=useState(0);
  const [error, setError] = useState(null);
  


  useEffect(() => {
    if (params && user) {
      getUserEnrolledCourseDetail();
    }
  }, [params, user]);

  const getUserEnrolledCourseDetail = () => {
    GlobalApi.getUserEnrolledCourseDetails(params.enrollId,
      user.primaryEmailAddress.emailAddress)
      .then(resp=>{
        setCompletedChapter(resp.userEnrollCourses[0].completedChapter)
        setCourseInfo(resp.userEnrollCourses[0].courseList);
      })
  }
/**
 * save completed chapter id
 */
const onChapterComplete = (chapterId) => {
  GlobalApi.markChapterCompleted(params.enrollId, chapterId).then(resp => {
    console.log(resp);
    if (resp) {
      toast('Chapter Marked as Completed!');
      // Directly update the state
      setCompletedChapter(prev => [...prev, { chapterId }]);
    }
  }).catch(error => {
    console.error("Error marking chapter as completed:", error);
    setError("Failed to mark chapter as completed. Please try again.");
  });
}


  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {courseInfo ? (
        <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-3">

          {/* title video,description  */}
          <div className="col-span-2 bg-white p-3">
            <CourseVideoDesciption courseInfo={courseInfo}
            activeChapterIndex={activeChapterIndex}
            watchMode={true}
            setChapterCompleted={(chapterId)=>onChapterComplete(chapterId)}
            />
          </div>
          {/* course content  */}
          <div>
            <CourseContentSection courseInfo={courseInfo}
             isUserAlreadyEnrolled={true}
             watchMode={true} 
             completedChapter={completedChapter}
             setActiveChapterIndex={(index)=>setActiveChapterIndex(index)}/>
          </div>
        </div>
      ) : (
        <p className=''>No course information available.</p>
      )}
    </div>
  );
}

export default WatchCourse;
