import React, { useState } from 'react'
import { MdGridOn } from "react-icons/md";

export const ProfileBody = ({userCompleteData}) => {
    const [showSaveSection,setShowSaveSection] = useState(false);

  return (
    <div className='mt-[2rem]'>
        <div className='flex justify-center gap-x-[2rem] border-t-[2px]'>
            <button onClick={() => setShowSaveSection(false)} className={`flex items-center gap-x-2 p-[1rem] ${!showSaveSection ? "border-t-[2px] border-black" : ""} cursor-pointer`}>
                <MdGridOn />
                <span>POSTS</span>
            </button>
            <button onClick={() => setShowSaveSection(true)} className={`flex items-center gap-x-2 p-[1rem] ${showSaveSection ? "border-t-[2px] border-black" : ""} cursor-pointer`}>
                <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.70947 10.1001L4.70947 6.3201L0.709473 10.1001V1.1001H8.70947V10.1001Z" stroke="#737373" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span>SAVED</span>
            </button>
        </div>
        {
            !showSaveSection ? userCompleteData?.Post?.length === 0 ? <div className='text-center mt-[2rem] text-[2rem] font-medium'>No post to display</div> : 
            <div className='grid grid-cols-3 space-x-0.5'>
            {
                userCompleteData?.Post?.map((data,index) => (
                    data?.Type === 'Image' ? <img key={index} src={data?.Url} loading='lazy' alt='post' className='w-[19rem] h-[19rem]'/> : 
                    <video controls className='w-[19rem] h-[19rem]'>
                        <source src={data?.Url} type="video/mp4"/>
                        Your browser does not support the video tag.
                     </video>
                ))
            }
            </div> 
            : userCompleteData?.SavePost?.length === 0 ? <div className='text-center mt-[2rem] text-[2rem] font-medium'>No save post to display</div> : 
            <div className='grid grid-cols-3 space-x-0.5'>
            {
                userCompleteData?.SavePost?.map((data,index) => (
                    data?.Type === 'Image' ? <img key={index} src={data?.Url} loading='lazy' alt='post' className='w-[17rem] h-[17rem]'/> : 
                    <video controls className='w-[17rem] h-[17rem]'>
                        <source src={data?.Url} type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                ))
            }
            </div>
        }
        
    </div>
  )
}
