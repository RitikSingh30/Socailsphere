import axios from 'axios';
import React, { useState } from 'react'
import {SEARCH_USERS} from '../../API_Endpoint/searchUsers'
import toast from 'react-hot-toast';
import { UserSearchProfile } from './UserSearchProfile';
import { IoIosSearch } from "react-icons/io";

export const SearchUsers = ({setShowSearchFriends}) => {
  const [searchText,setSearchText] = useState("");
  const [userFound,setUserFound] = useState(null);

  const changeHandler = async(e) => {
    
    const curValueInSearchBox = e.target.value ;
    setSearchText(curValueInSearchBox);

    const toastId = toast.loading('Loading...');
    // Accessing token
    const token = sessionStorage.getItem('token');
    try{
      const response = await axios.get(SEARCH_USERS, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          searchUserName: curValueInSearchBox
        }
      });

      setUserFound(response?.data?.allUserWithSearchName);
      
    }catch(error){
      console.log(error);
      setUserFound(null);
    }

    toast.dismiss(toastId);
  }

  return (
    <div className='mt-[2rem] ml-[7rem]'>
        <div className='flex flex-col gap-y-[1rem] pb-3 border-b border-b-gray-300'>
            <h2 className='text-[1.563rem] leading-[0.859rem] font-semibold ml-[1rem]'>Search</h2>
            <div className='flex gap-x-[1rem] ml-[1rem] bg-gray-100 items-center px-[1rem] py-[0.4rem] rounded-md'>
                <IoIosSearch className='text-gray-400'/>
                <input onChange={changeHandler} type='search' placeholder='Search' value={searchText} className='outline-none bg-gray-100'/>
            </div>
        </div>
        <div>
          {
            userFound && userFound.map((data) => (
              <UserSearchProfile key={data?._id} ProfilePicture={data?.ProfilePicture} UserName={data?.UserName} setShowSearchFriends={setShowSearchFriends}/>
            ))
          }
        </div>
    </div>
  )
}
