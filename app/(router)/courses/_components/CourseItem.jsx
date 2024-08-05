import Image from 'next/image'
import React from 'react'

function CourseItem({course}) {
  return (
    <div className='border rounded-xl
    hover:shadow-md
    hover:shadow-purple-300
    cursor-pointer'>
        <Image src={course?.banner?.url}
        width={500}
        height={150}
        alt='banner'
        className='rounded-t-md h-[130px] object-cover'
        />
       <div className='flex flex-col gap-1 p-2'>
            <h2 className='font-semibold text-[18px]'>{course.name}</h2>
            <h2 className='text-[15px]font-semibold text-gray-400'>{course.author}</h2>
            {course?.chapter?.length==1 ? 
            <div className='flex gap-2 items-center'>
                <Image src='/youtube.png'
                alt='youtube'
                width={25}
                height={25}/>
                <h2 className='text-[14px] text-gray-400'>Watch on Youtube</h2>
            </div>:
            <div className='flex gap-2 items-center'>
                <Image src='/chapter.png'
                alt='chapters'
                width={25}
                height={25}
                />
                <h2 className='text-[14px] text-gray-400'>Chapters</h2>
            </div>}
            <h2 className='text-[14px] font-bold'>{course?.free?'Free':'Paid'}</h2>
        </div>
    </div>
  )
}

export default CourseItem