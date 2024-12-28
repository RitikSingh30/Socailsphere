import React from 'react'

export const DiscardPostModal = ({setShowDiscardPostModal,setUploadDocUrl}) => {
  const discardPostHandler = () => {
    setShowDiscardPostModal(false);
    setUploadDocUrl('');
  }

  const cancelPostHandler = () => {
    setShowDiscardPostModal(false);
  }
  return (
    <div className='w-screen h-screen absolute bg-black bg-opacity-60 flex justify-center items-center'>
      <div className='bg-white rounded-lg pt-[1.5rem]'>
        <div className='pb-[1.3rem] px-[5rem]'>
          <p className='text-[1.5rem] text-center'>Discard post?</p>
          <p className='text-center text-[0.9rem] text-gray-500'>If you leave, your edits won't be saved.</p>
        </div>
        <p onClick={discardPostHandler} className='text-red-500 font-bold border-t-[1px] text-center px-[5rem] py-[0.5rem] cursor-pointer'>Discard</p>
        <p onClick={cancelPostHandler} className='border-t-[1px] text-center px-[5rem] py-[0.5rem] cursor-pointer'>Cancel</p>
      </div>
    </div>
  )
}
