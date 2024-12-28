import React from 'react'
import { TfiSettings } from "react-icons/tfi";
import { useDispatch } from 'react-redux';
import { show } from '../../Slices/ShowEditProfileSlice';

export const ProfileHeader = ({userCompleteData}) => {
    const dispatch = useDispatch();

  return (
    <div className='flex gap-x-[5rem] mt-[2rem] items-center'>
        {/* User profile  */}
        <img src={userCompleteData?.ProfilePicture} alt='Profile' loading='lazy' className='w-[9rem] h-[9rem] border border-black rounded-full'/>

        {/* User Detail  */}
        <div className='flex flex-col gap-y-[1rem]'>

          <div className='flex gap-x-[0.5rem]'>
            {/* user Name  */}
            <p className='text-[1.25rem] font-normal'>{userCompleteData?.UserName}</p>
            <button onClick={() => dispatch(show())} className='bg-[#EFEFEF] text-[0.875rem] font-semibold px-[1rem] py-[0.4rem] rounded-md ml-[0.7rem]'>Edit Profile</button>
            <button className='bg-[#EFEFEF] text-[0.875rem] font-semibold px-[1rem] py-[0.4rem] rounded-md'>Message</button>
          </div>

          <div className='flex gap-x-[1.5rem]'>
            <p className='font-semibold'> <span>{userCompleteData?.Post.length}</span> posts</p>
            <p className='font-semibold cursor-pointer'> <span>{userCompleteData?.Followers.length}</span> followers</p>
            <p className='font-semibold cursor-pointer'> <span>{userCompleteData?.Following.length}</span> following</p>
          </div>

          <div className='text-[0.875rem]'>
            <p>{userCompleteData?.FullName}</p>
            <p className='leading-[1.125rem]'>{userCompleteData?.Bio}</p>
          </div>
        </div>

        {/* Setting  */}
        <TfiSettings className='self-start cursor-pointer' />
    </div>
  )
}
