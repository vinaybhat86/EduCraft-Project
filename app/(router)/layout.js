"use client"
import React, { useContext, useEffect } from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'
import { useUser } from '@clerk/nextjs'
import GlobalApi from '../_utils/GlobalApi'
import { UserMemberContext } from '../_context/UserMemberContext'
import { AlignJustify } from 'lucide-react'

function layout({children}) {
   
   
    const {user}=useUser();
    const {isMember,setIsMember}=useContext(UserMemberContext)
    useEffect(()=>{
      user&&checkUserMembership();
    },[user])

    /**
   * chcking whether the user is member or not..
   */
    const checkUserMembership=()=>{
    GlobalApi.checkForMembership(user.primaryEmailAddress.emailAddress)
    .then(resp=>{
      console.log(resp);
      if(resp?.memberships?.length>0)
      {
        console.log("Its member")
        setIsMember(true);
      }
    })

  }
  return (
    <div className='flex'>
    <div className='hidden sm:block sm:w-64 fixed'>
        <SideNav />
    </div>
    <div className='flex-1 ml-0 sm:ml-64'>
        <Header />
        {children}
    </div>
</div>

  )
}

export default layout