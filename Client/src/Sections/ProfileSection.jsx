import React, { useEffect, useState } from 'react'
import { ProfileHeader } from '../Component/Profile/ProfileHeader'
import { useLocation } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
import { GET_USER_DATA } from '../API_Endpoint/GetUserData';

export const ProfileSection = () => {
  const location = useLocation();
  const userData = location.state ;
  const [userCompleteData,setUserCompleteData] = useState(null);

  useEffect(() => {
    async function fetchData(){
      const toastId = toast.loading('Loading...');
      try{
          const updatedUserData = {...userData,allData:true};
          const response = await axios.get(GET_USER_DATA,{params:updatedUserData});
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
    <div>
        <ProfileHeader userCompleteData={userCompleteData}/>
    </div>
  )
}
