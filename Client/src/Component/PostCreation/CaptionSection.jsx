import React, { useEffect, useState } from 'react'
import EmojiPicker from 'emoji-picker-react';
import { GrEmoji } from "react-icons/gr";
import {useDispatch} from 'react-redux'
import { setCaptionData } from '../../Slices/PostDataSlice';

export const CaptionSection = ({showCaptionSection,userCompleteData}) => {
    // console.log(userCompleteData)
    const [showEmoji,setShowEmoji] = useState(false);
    const [characterFilled,setCharacterFilled] = useState(0);
    let [captionValue,setCaptionValue] = useState('');
    const dispatch = useDispatch();
    
    useEffect(() => {
      dispatch(setCaptionData(captionValue));
    },[captionValue]);

    const isNotEmoji = (value) => {
      // This regex matches any non-ASCII characters, which includes most emojis
      const emojiRegex = /[^\x00-\x7F]+/g; 
      return !emojiRegex.test(value);
    }

    const emojiClickedHandler = (e) => {
      setCaptionValue(prevValue => prevValue + e.emoji);
      setCharacterFilled(prevValue => prevValue + 1);
    }

    const handleOnChange = (e) => {
      // calculating the length of the input explicity (there is a reason behind this we can't do e.target.value.length because emoji lenght will be counted as 2)
      let len = e.target.value.length ;
      let curInputVal = e.target.value ;
      let countLenOfInput = 0 ;
      for(let i = 0 ; i < len ; i++){
        if(isNotEmoji(curInputVal[i])) countLenOfInput++ ;
        else{
          countLenOfInput++ ;
          i++ ;
        }
      }
      setCaptionValue(e.target.value);
      setCharacterFilled(countLenOfInput);
    }

  return (
    <div className={`${showCaptionSection ? "block" : "hidden"} w-[45%] py-[1.2rem] px-[1rem]`}>
      <div className='flex gap-x-[0.7rem] items-center'>
        <img src={userCompleteData?.ProfilePicture} alt='User Profile' loading='lazy' 
        className='w-[2rem] h-[2rem] rounded-full object-fill border border-black border-[0.5px]'/>
        <p className='font-bold'>{userCompleteData?.UserName}</p>
      </div>
      <textarea value={captionValue} placeholder='Write a caption...' rows="9" cols="34" maxLength="2200" onChange={(e) => handleOnChange(e)}
      className='resize-none outline-none mt-[1rem] font-medium'/>
      <div className='border-b border-b-[1.5px] pb-[0.6rem]'>
        <div className='flex justify-between'>
          <GrEmoji onClick={() => setShowEmoji(!showEmoji)} className='text-[1.2rem] cursor-pointer'/>
          <p className='text-gray-400'>{characterFilled}/2,200</p>
        </div>
        <EmojiPicker open={showEmoji} width={"300"} height={380} onEmojiClick={emojiClickedHandler}/>
      </div>
    </div>
  )
}
