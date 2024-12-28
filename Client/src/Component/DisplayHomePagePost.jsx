import React from 'react'
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import { GoHeart } from "react-icons/go";
import { FaRegMessage, FaRegBookmark} from "react-icons/fa6";

export const DisplayHomePagePost = ({postData}) => {
  return (
    <div className='mx-auto w-full max-w-[614px] border border-gray-300 mt-4 p-4'>
        <div className='flex items-center'>
          <img src={postData?.ProfilePicture} className='w-6 h-6 sm:w-8 sm:h-8 rounded-full'/>
          <p className='ml-2'>{postData?.UserName}</p>
          <PiDotsThreeOutlineFill className='ml-auto'/>
        </div>
        {/* body  */}
        <div className='mt-2'>
          {
            postData?.Type === 'Image' ? (
              <img 
                src={postData?.Url} 
                alt='Profile' 
                className='w-full h-auto max-h-96 object-cover'
              />
            ) : (
              <video 
                controls 
                className='w-full h-auto max-h-96'
              >
                <source src={postData?.Url} type="video/mp4"/>
                Your browser does not support the video tag.
              </video>  
            )
          }
        </div>
        {/* Footer */}
          <div className='mt-2'>
            <div className='flex justify-between'>
              <div className='flex gap-x-3'>
                <GoHeart className='w-7 h-7' />
                <FaRegMessage className='w-6 h-6' />
              </div>
              <FaRegBookmark className='w-6 h-6' />
            </div>
            {/* Likes */}
          <div className='flex gap-x-1 mt-2'>
            <span>{postData?.Like.length}</span>
            <span>likes</span>
          </div>
          <input type='text' placeholder='Add a comment' className='mt-2 outline-none w-full' />
        </div>
    </div>
  )
}


