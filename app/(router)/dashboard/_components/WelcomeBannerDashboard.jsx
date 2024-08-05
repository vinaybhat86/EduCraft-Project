// import Image from 'next/image'
// import React from 'react'

// function WelcomeBannerDashboard({user}) {
//   console.log('User object:', user);
//   return (
//     <div className='bg-white rounded-md p-5 flex gap-5 items-center'>
//         <Image src={'/boy.png'} alt='webscraft'
//         width={180}
//         height={180}/>
//         <div>
//             <h2 className='text-[32px] font-light p-1'>Welcome Back,
//             <span className='font-bold text-primary'>{user?.fullName}</span></h2>
//             <h2 className='text-[16px] font-light text-slate-500 pl-2'>Lets Begin Learning where you left off,<br/>
//             Keep it up and improve your progress</h2>
//         </div>
//     </div>
//   )
// }

// export default WelcomeBannerDashboard

import Image from 'next/image'
import React from 'react'

function WelcomeBannerDashboard({ user }) {
  console.log('User object:', user);
  return (
    <div className='bg-white rounded-md p-5 flex flex-col md:flex-row gap-5 items-center'>
      <Image src={'/boy.png'} alt='webscraft' width={180} height={180} className='w-32 h-32 md:w-[180px] md:h-[180px]' />
      <div className='text-center md:text-left'>
        <h2 className='text-[24px] md:text-[32px] font-light p-1'>
          Welcome Back,
          <span className='font-bold text-primary'>{user?.fullName}</span>
        </h2>
        <h2 className='text-[14px] md:text-[16px] font-light text-slate-500 pl-2'>
          Let's Begin Learning where you left off,<br />
          Keep it up and improve your progress
        </h2>
      </div>
    </div>
  );
}

export default WelcomeBannerDashboard;
