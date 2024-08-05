import { Progress } from '@/components/ui/progress'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ProgressCourseItem({course}) {

    const getTotalCompletedChapterPerc=(item)=>{
        // perc=(totalCompletedChapter/totalChapter)*100
        const perc=(item.completedChapter?.length/item?.courseList?.chapter?.length)*100
        return perc.toFixed(1);
    }
  return (
    <Link href={"/course-preview/"+course?.courseList?.slug}>
    <div className='border rounded-xl
    hover:shadow-md
    hover:shadow-purple-300
    cursor-pointer'>
        <Image src={course?.courseList?.banner?.url}
        width={500}
        height={150}
        alt='banner'
        className='rounded-t-md h-[130px] object-cover'
        />
       <div className='flex flex-col gap-1 p-2'>
            <h2 className='font-semibold text-[18px]'>{course.courseList?.name}</h2>
            <h2 className='text-[15px]font-semibold text-gray-400'>{course.courseList?.author}</h2>
            <h2 className='text-[12px] text-gray-400 mt-1'>
                {getTotalCompletedChapterPerc(course)}% 
            <span className='float-right'>{course.completedChapter?.length}/{course?.courseList?.chapter?.length} Chapters</span></h2>
            <Progress value={parseFloat(getTotalCompletedChapterPerc(course))} className="h-[7px]"/>
            
        </div>
    </div>
    </Link>
  )
}

export default ProgressCourseItem