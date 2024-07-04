import React, { useEffect, useState } from 'react'
import socailspherelogo from '../Asserts/Logo/socailsphereNameLogo.svg'
import { SidebarData } from '../Data/Welcome/SidebarData'
import { RxHamburgerMenu } from "react-icons/rx";
import { InitialProfileSetup } from '../Component/InitialProfileSetup';
import axios from 'axios'
import { GET_USER_DATA } from '../API_Endpoint/GetUserData';
import { Link, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast'

export const WelcomeSection = () => {

    const [sideBarActive, setSideBarActive] = useState([true,false,false,false,false,false]);
    const location = useLocation();
    const userData = location.state ;
    const [userProfilePicture,setUserProfilePicture] = useState('');
    const [userCompleteData,setUserCompleteData] = useState('');
    const [showInitialProfileSetup,setShowInitialProfileSetup] = useState(false);

    const changeActiveSection = (Id) => {
        const arr = [false,false,false,false,false,false];
        arr[Id] = true ;
        setSideBarActive(arr);
    }

    useEffect(() => {
        
        if(userData?.showInitialProfileSetup) setShowInitialProfileSetup(true);

        async function fetchData(){
            const toastId = toast.loading('Loading...');
            try{
                const response = await axios.get(GET_USER_DATA,{params:userData});
                if(response?.data?.success){
                    toast.dismiss(toastId);
                    setUserProfilePicture(response?.data?.userData?.ProfilePicture);
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

    useEffect(() => {
        setUserProfilePicture(userCompleteData?.ProfilePicture);
    },[userCompleteData]);

  return (
    <div className='relative'>

        <div className='absolute'>
             {/* SideBar  */}
            <div className='flex flex-col gap-y-[8rem] pl-[1rem] pt-[1rem] h-screen'>
                <img src={socailspherelogo} loading='lazy' alt='Logo' className='w-[9rem]'/>
                <div className='-mt-[6rem] flex flex-col gap-y-[2.5rem] grow'>
                    {
                        SidebarData?.map((data) => (
                            <Link to={data?.Navigate}>
                                <div onClick={() => changeActiveSection(data?.Id - 1)} key={data?.Id} className='flex gap-x-[0.5rem] cursor-pointer items-center'>
                                    {data?.Name === 'Profile' ? <img src={userProfilePicture} alt='Profile' loading='lazy' className='w-[2rem] -ml-[0.4rem]' /> : data?.Icon}
                                    <p className={`text-[1.1rem] ${sideBarActive[data?.Id - 1] ? "font-bold" : ""}`}>{data?.Name}</p>
                                </div>
                            </Link>
                        ))
                    }
                </div>
                <div className='flex gap-x-[0.5rem] cursor-pointer items-center'>
                    <RxHamburgerMenu />
                    <p>More</p>
                </div>
            </div>
        </div>

        {
            showInitialProfileSetup && <InitialProfileSetup userCompleteData={userCompleteData} setShowInitialProfileSetup={setShowInitialProfileSetup}
            Email={userData?.Email} setUserCompleteData={setUserCompleteData}/>
        }
    </div>
  )
}
