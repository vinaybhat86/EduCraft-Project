"use client"
import GlobalApi from '@/app/_utils/GlobalApi';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import Script from 'next/script';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

function SubscriptionPage () {

  const [subscriptionId,setSubscriptionId]=useState(null)
  const[loader,setLoader]=useState(false);
  const[isMember,setIsMember]=useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const {user}=useUser();

  useEffect(()=>{
    if(user){
      checkMembershipStatus();
    }
  },[user]);

  const checkMembershipStatus=async()=>{
    try{
      const response=await GlobalApi.checkForMembership(user.primaryEmailAddress.emailAddress);
      setIsMember(response.memberships.length>0);
    } catch(error){
      console.error('Error checking membership status',error);
    }
  };

  /**
   * To create subscription id
   * @param {*} planId 
   */
  const createSubscription=async(planId)=>{
    setLoader(true)
    console.log(planId)
    axios.post("/api/create-subscription",JSON.stringify({
      plan_id:planId
    })).then(resp=>{
      console.log(resp.data);
      setLoader(false)
        setSubscriptionId(resp.data.id)
        makePayment();
    })
  }

  const makePayment=()=>{
    const options={
      key:process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY,
      subscription_id:subscriptionId,
      name:'Edu-Craft Academy',
      description:'Edu-Craft Pro Membership',
      handler:async(resp)=>{
        console.log(resp);
        if(resp)
        {
          addNewMember(resp?.razorpay_payment_id)
        }

      },
      theme:{
        color:'#7D41D1'
      }
    }

    const rzp=new window.Razorpay(options);
    rzp.open();
  }

  const addNewMember=async(paymentId)=>{
    try{
      const response = await GlobalApi.addNewMember(user.primaryEmailAddress.emailAddress,paymentId);
      console.log(response);
        if(response)
        {
          toast('Payment Successfull !');
          setPaymentSuccess(true);
          setIsMember(true);
        }
      } catch (error){
        toast('Error Occured');
      }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
      <Script
      id='razorpay-checkout-js' src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-5 md:space-y-0 md:space-x-10 max-w-5xl  w-full">
        <div className="bg-white p-10  rounded-lg shadow-md w-full md:w-1/2 hover:border-primary hover:shadow-primary">
          <h2 className="text-2xl font-bold mb-2">Monthly</h2>
          <p className="text-4xl font-bold mb-2">50Rs/month</p>
          <ul className="mb-6 space-y-3">
            <li>✔ Access to All Courses</li>
            <li>✔ Free Source Code</li>
            <li>✔ Free App Membership</li>
            <li>✔ Email & Instagram DM support</li>
          </ul>
          {isMember ? (
            <p className="text-lg font-bold text-green-600">Thanks for buying the membership!</p>
          ) : (
          <Button className="bg-primary text-white py-2 px-4 rounded-3xl w-full"
           onClick={()=>createSubscription('plan_OZvUxlivlUbGt2')}>Get Started</Button>
          )}
        </div>
        <div className="bg-white p-10 rounded-lg shadow-md w-full md:w-1/2 hover:border-primary hover:shadow-primary">
          <h2 className="text-2xl font-bold mb-2">Yearly</h2>
          <p className="text-4xl font-bold mb-2">499Rs/year</p>
          <ul className="mb-6 space-y-3">
            <li>✔ Access to All Courses</li>
            <li>✔ Free Source Code</li>
            <li>✔ Free App Membership</li>
            <li>✔ Email & Instagram DM support</li>
          </ul>
          {isMember ? (
            <p className="text-lg font-bold text-green-600">Thanks for buying the membership!</p>
          ) : (
          <Button className="bg-primary text-white py-2 px-4 rounded-3xl w-full">Get Started
          </Button>
           )}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
