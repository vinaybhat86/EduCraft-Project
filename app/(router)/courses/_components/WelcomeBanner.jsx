import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {
  return (
    <div className='flex gap-5 items-center bg-white rounded-xl p-5'>
        <Image src='/boy.png' alt='boy'
        width={140} height={140}/>
        <div>
            <h2 className='font-bold text-[35px]'>
                Welcome to <span className='text-primary'>Edu-Craft</span> Academy</h2>
            <h2 className='text-gray-500 text-[20px]'>Explore and learn from top courses listed !</h2>
        </div>
    </div>
  )
}

export default WelcomeBanner