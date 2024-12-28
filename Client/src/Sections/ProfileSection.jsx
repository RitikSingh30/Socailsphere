import React, { useEffect, useState } from 'react'
import { ProfileHeader } from '../Component/Profile/ProfileHeader'
import toast from 'react-hot-toast';
import axios from 'axios';
import { GET_USER_DATA } from '../API_Endpoint/GetUserData';
import { ProfileBody } from '../Component/Profile/ProfileBody';
import { useLocation } from 'react-router-dom';

export const ProfileSection = () => {
  const [userCompleteData,setUserCompleteData] = useState(null);
  const location = useLocation();

  useEffect(() => {
    async function fetchData(){
      const toastId = toast.loading('Loading...');
      try{
          const token = sessionStorage.getItem('token');
          const getDataForDifferentUser = location.state?.getDataForDifferentUser ;
          const updatedUserData = {allData:true,getDataForDifferentUser};
          const response = await axios.get(GET_USER_DATA,{
            params:updatedUserData,
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          if(response?.data?.success){
              toast.dismiss(toastId);
              setUserCompleteData(response?.data?.userData);
          }
      }catch(error){
          toast.dismiss(toastId);
          console.log(error)
      }
      toast.dismiss(toastId);
    }
    fetchData();
   
  },[]);
 
  return (
    <div className='mx-auto'>
        <ProfileHeader userCompleteData={userCompleteData}/>
        <ProfileBody userCompleteData={userCompleteData}/>
    </div>
  )
}
