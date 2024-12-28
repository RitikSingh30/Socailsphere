import React from 'react'
import { RxCross1 } from "react-icons/rx";
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { showWelcomeSectionSideBarNameDispatch } from '../../Slices/ShowWelcomeSectionSideBarName';

export const UserSearchProfile = ({ProfilePicture,UserName,setShowSearchFriends}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const seachUsersIsClickedOpenProfile = () => {
        dispatch(showWelcomeSectionSideBarNameDispatch());
        setShowSearchFriends(false);
        navigate("/Welcome/Profile", { state: {getDataForDifferentUser:UserName} });
    }

  return (
    <div onClick={seachUsersIsClickedOpenProfile} className='flex items-center gap-x-[1rem] ml-[1rem] mt-[1rem]'>
        <img src={ProfilePicture} alt='UserProfile' loading='lazy' className='w-[2rem] h-[2rem] rounded-full cursor-pointer'/>
        <p className='text-[1.1rem] cursor-pointer'>{UserName}</p>
        <RxCross1 className='ml-[4rem] cursor-pointer'/>
    </div>
  )
}

// Define PropTypes for validation 
UserSearchProfile.propTypes = {
    ProfilePicture: PropTypes.string.isRequired, // Ensure ProfilePicture is a string and required
    UserName: PropTypes.string.isRequired, // Ensure UserName is a string and required
}
