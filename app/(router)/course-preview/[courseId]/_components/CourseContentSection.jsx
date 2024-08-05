import { Lock, Play } from 'lucide-react'
import React, { useState } from 'react'

function CourseContentSection({courseInfo,isUserAlreadyEnrolled,
    watchMode=false,setActiveChapterIndex,completedChapter}) {
    const [activeIndex,setActiveIndex]=useState(0);
    
/**
 * used to check the chapter completed or not
 */
    const checkIsChapterCompleted=(chapterId)=>{
        return completedChapter?.find(item=>item.chapterId==chapterId)
    }

  return courseInfo&& (
    <div className='p-3 bg-white rounded-sm mt-3'>
        <h1 className='text-[19px] font-semibold'>Contents</h1>
        {courseInfo?.chapter?.map((item,index)=>(
            <div key={index}>
                <h2 className={`p-3 text-[16px] 
                flex justify-between items-center
                m-3 hover:bg-gray-200 hover:text-gray-500
                border rounded-md px-4 cursor-pointer
                ${activeIndex==index&&'bg-primary text-white'}
                ${isUserAlreadyEnrolled&&'hover:bg-primary hover:text-white'}
                ${watchMode&&checkIsChapterCompleted(item.id)&&
                    'border-green-800 bg-green-400'
                }
                `}
                onClick={()=>{
                    if (watchMode) {
                        setActiveChapterIndex(index);
                        setActiveIndex(index);
                    }
                }}
                >
                    {index+1}. {item.name}
                    {activeIndex==index||isUserAlreadyEnrolled?
                    <Play className='h-4 w-4'/>:
                    <Lock className='h-4 w-4'/>}
                </h2>
            </div>
        ))}
    </div>
  )
}

export default CourseContentSection