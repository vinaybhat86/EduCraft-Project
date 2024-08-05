import { UserMemberContext } from '@/app/_context/UserMemberContext';
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useEffect } from 'react'
import { toast } from "sonner"


function CourseEnrollSection({courseInfo,isUserAlreadyEnrolled}) {
    //const membership= false;
    const {user}=useUser();
    const {isMember,setIsMember}=useContext(UserMemberContext)
    const router=useRouter();

    useEffect(()=>{
      console.log("isUserAlreadyEnrolled",isUserAlreadyEnrolled)
    },[])

    // Enroll to the course

    const onEnrollCourse=()=>{
      GlobalApi.enrollToCourse(courseInfo?.slug,user?.primaryEmailAddress?.emailAddress).then(resp=>{
        console.log(resp);
        if(resp)
        {
          // show toast on enrollment 
          toast("User Enrolled Successfully", {
            description: "User Enrolled to this Course",
          })

          // residrect to watch course
          router.push('/watch-course/'+resp.createUserEnrollCourse.id)
        }
        
      })
    }

    // to check user already enrolled to course

  return courseInfo&&(
    <div className='p-3 text-center rounded-sm bg-primary flex flex-col gap-3'>
        
        
        <h2 className='text-[22px] font-bold text-white'>
            Enroll to the Course</h2>

            {/* user has membership and already login */}
            { user&&(isMember||courseInfo.free)&&!isUserAlreadyEnrolled?<div className='flex flex-col gap-3 mt-3'>
            <h2 className='text-white font-light'>
            Enroll Now to Start Learning and Building the project</h2>
            <Button className="bg-white text-primary hover:bg-white
            hover:text-primary"
            onClick={()=>onEnrollCourse()}
            >Enroll Now</Button>
            </div>
            :!user?
            <div className='flex flex-col gap-3 mt-3'>
            <h2 className='text-white font-light'>
            Enroll Now to Start Learning and Building the project</h2>
            <Link href={'/sign-in'}><Button className="bg-white text-primary hover:bg-white
            hover:text-primary">Enroll Now</Button></Link>
            </div>
           
            :!isUserAlreadyEnrolled&&<div className='flex flex-col gap-3 mt-3'>
                <h2 className='text-white font-light'>
            Buy Membership and get access to all courses</h2>
            <Link href={'/membership'}><Button className="bg-white text-primary hover:bg-white
            hover:text-primary mt-3">Buy Membership Just @199/- </Button></Link>
            </div>}
             {/* user does not have membership or not login  */}
             
             {isUserAlreadyEnrolled&&
             <div className='flex flex-col gap-3 mt-3'>
                <h2 className='text-white font-light'>
            Continue to Learn Your Course</h2>
            <Link href={'/watch-course/'+isUserAlreadyEnrolled}><Button className="bg-white text-primary hover:bg-white
            hover:text-primary mt-3">Continue </Button>
            </Link>
            </div>}


    </div>
  )
}

export default CourseEnrollSection