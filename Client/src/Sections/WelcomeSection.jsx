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
import { show } from '../Slices/ShowEditProfileSlice';
import { PostCreation } from '../Component/PostCreation/PostCreation';
import { SearchUsers } from '../Component/SearchUser/SearchUsers';
import { hideWelcomeSectionSideBarNameDispatch, showWelcomeSectionSideBarNameDispatch } from '../Slices/ShowWelcomeSectionSideBarName';

export const WelcomeSection = () => {

    const showInitialProfileSetup = useSelector((state) => state.showEditProfileSlice.value);
    const showWelcomeSectionSideBarName = useSelector((state) => state.showWelcomeSectionSideBarName.value);
    const dispatch = useDispatch();
    const location = useLocation();
    const userData = location.state ;
    const [userProfilePicture,setUserProfilePicture] = useState('');
    const [userCompleteData,setUserCompleteData] = useState('');
    const [showPostCreating,setShowPostCreation] = useState(false);
    const [showSearchFriends,setShowSearchFriends] = useState(false);

    useEffect(() => {
        
        if(userData?.showInitialProfileSetup) dispatch(show());

        async function fetchData(){
            const toastId = toast.loading('Loading...');
            try{
                const token = sessionStorage.getItem('token');
                const response = await axios.get(GET_USER_DATA,{
                    headers : {
                        Authorization: `Bearer ${token}`
                    }
                });
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

    const clickHandler = (data) => {
        if(data === 'Create') setShowPostCreation(true);
        else if(data === 'Search'){
            setShowSearchFriends(true);
            dispatch(hideWelcomeSectionSideBarNameDispatch());
        }
        else{
            setShowPostCreation(false);
            setShowSearchFriends(false);
            dispatch(showWelcomeSectionSideBarNameDispatch());
        }
    }

  return (
    <div className='flex'>

        <div className={`${showWelcomeSectionSideBarName ? "pr-[5rem]" : "w-[110px]"} border-r border-gray-300 fixed top-0`}>
             {/* SideBar  */}
            <div className='flex flex-col gap-y-[8rem] pl-[1rem] pt-[1rem] h-screen'>
                <img src={socailspherelogo} loading='lazy' alt='Logo' className={`w-[9rem]
                    ${!showWelcomeSectionSideBarName ? "invisible" : "visible"}`}/>
                <div className='-mt-[6rem] flex flex-col gap-y-[2.5rem] grow'>
                    {
                        SidebarData?.map((data) => (
                            <Link key={data?.Id} to={data?.Navigate} onClick={() => clickHandler(data?.Name)}>
                                <div key={data?.Id} className={`flex gap-x-[0.5rem] cursor-pointer items-center 
                                    ${!showWelcomeSectionSideBarName && "justify-center"}`}>
                                    {data?.Name === 'Profile' ? <img src={userProfilePicture} alt='Profile' loading='lazy' 
                                    className='w-[2rem] h-[2rem] -ml-[0.4rem] rounded-full object-fill border border-black border-[0.5px]' />
                                     : data?.Icon}
                                    <p className={`text-[1.1rem] ${"/Welcome/" + data?.Navigate === location.pathname 
                                        && !userData?.getDataForDifferentUser ? "font-bold" : ""}`}>
                                    {showWelcomeSectionSideBarName && data?.Name}</p>
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

        {
            showSearchFriends && <SearchUsers setShowSearchFriends={setShowSearchFriends}/>
        }

        {
            showPostCreating && <PostCreation setShowPostCreation={setShowPostCreation} userCompleteData={userCompleteData}/>
        }
    </div>
  );
};
