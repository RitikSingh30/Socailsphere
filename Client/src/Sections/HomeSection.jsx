import React, {useEffect, useState} from 'react'
import StoriesAndHighlights from '../Component/StoriesAndHighlights/StoriesAndHighlights'
import toast from "react-hot-toast";
import axios from "axios";
import { GET_POST_TO_DISPLAY_AT_HOME_PAGE } from '../API_Endpoint/GetPostToDisplayAtHomePage';
import { DisplayHomePagePost } from '../Component/DisplayHomePagePost';

export const HomeSection = () => {
  const [postData,setPostData] = useState([])

  useEffect(() => {
    const fetchUserData = async () => {
      const toastId = toast.loading("Loading...");
      try {
        const token = sessionStorage.getItem('token');

        const response = await axios.get(GET_POST_TO_DISPLAY_AT_HOME_PAGE, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response?.data?.success) {
          toast.dismiss(toastId);
          setPostData(response?.data?.postData); 
        }
      } catch (error) {
        toast.dismiss(toastId);
        console.error(error);
      } finally {
        toast.dismiss(toastId);
      }
    };

    fetchUserData();
  }, []);


  return (
    <div className='mx-auto'>
        {/* <StoriesAndHighlights /> */}
        <div>
          {
            postData?.map((data) => (
              <DisplayHomePagePost key={data?.Id} postData={data} />
            ))
          }
        </div>
    </div>
  )
}
