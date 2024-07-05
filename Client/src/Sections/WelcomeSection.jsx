import React, { useEffect, useState } from 'react'
import socailspherelogo from '../Asserts/Logo/socailsphereNameLogo.svg'
import { SidebarData } from '../Data/Welcome/SidebarData'
import { RxHamburgerMenu } from "react-icons/rx";
import { InitialProfileSetup } from '../Component/InitialProfileSetup';
import axios from 'axios'
import { GET_USER_DATA } from '../API_Endpoint/GetUserData';
import { Link, Outlet, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux';
import { show } from '../Slices/showEditProfileSlice';

export const WelcomeSection = () => {

    const showInitialProfileSetup = useSelector((state) => state.showEditProfileSlice.value);
    const dispatch = useDispatch();

    const location = useLocation();
    const userData = location.state ;
    const [userProfilePicture,setUserProfilePicture] = useState('');
    const [userCompleteData,setUserCompleteData] = useState('');

    useEffect(() => {
        
        if(userData?.showInitialProfileSetup) dispatch(show());

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
    console.log(userCompleteData)

    useEffect(() => {
        setUserProfilePicture(userCompleteData?.ProfilePicture);
    },[userCompleteData]);

  return (
    <div className='flex'>

        <div className='pr-[7rem]'>
             {/* SideBar  */}
            <div className='flex flex-col gap-y-[8rem] pl-[1rem] pt-[1rem] h-screen'>
                <img src={socailspherelogo} loading='lazy' alt='Logo' className='w-[9rem]'/>
                <div className='-mt-[6rem] flex flex-col gap-y-[2.5rem] grow'>
                    {
                        SidebarData?.map((data) => (
                            <Link key={data?.Id} to={data?.Navigate} state = { userData }>
                                <div key={data?.Id} className='flex gap-x-[0.5rem] cursor-pointer items-center'>
                                    {data?.Name === 'Profile' ? <img src={userProfilePicture} alt='Profile' loading='lazy' className='w-[2rem] -ml-[0.4rem] rounded-full' />
                                     : data?.Icon}
                                    <p className={`text-[1.1rem] ${"/Welcome/" + data?.Navigate === location.pathname ? "font-bold" : ""}`}>{data?.Name}</p>
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
        <Outlet/>
       
        {
            showInitialProfileSetup && <InitialProfileSetup userCompleteData={userCompleteData}
            Email={userData?.Email} setUserCompleteData={setUserCompleteData}/>
        }
    </div>
  );
};
