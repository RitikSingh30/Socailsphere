import React, { useEffect, useRef, useState } from 'react';
import Dropzone from 'dropzone';
import 'dropzone/dist/dropzone.css'; // Import Dropzone CSS
import '../../App.css'
import { RxCross2 } from "react-icons/rx";
import { GoArrowLeft } from "react-icons/go";
import { DiscardPostModal } from './DiscardPostModal';
import { CaptionSection } from './CaptionSection';
import { shallowEqual, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import { CREATE_NEW_POST } from '../../API_Endpoint/CreateNewPost';
import { useNavigate } from 'react-router-dom';

export const PostCreation = ({setShowPostCreation,userCompleteData}) => {
  const dropDownRef = useRef(null);
  const [uploadDocUrl,setUploadDocUrl] = useState('');
  const [showDiscardPostModal,setShowDiscardPostModal] = useState(false);
  const [showCaptionSection,setShowCaptionSection] = useState(false);
  const [imageUploaded,setImageUploaded] = useState(false);
  const caption = useSelector((state) => state.captionDataSlice.value,shallowEqual);
  const navigate = useNavigate();

  useEffect(() => {
    let myDropzone ;
    if (dropDownRef.current) {
      myDropzone = new Dropzone(dropDownRef.current, {
        url: '/dummy-url', 
        autoProcessQueue: false,
        paramName: 'file', 
        maxFiles: 1, 
        maxFilesize: 5,
        acceptedFiles: 'image/*,video/*', 
        dictDefaultMessage: ''
      });

      myDropzone.on('addedfile',(file) => {

        if (file.size > 5242880) { // 5MB size limit
          myDropzone.removeFile(file);
          toast.error('File size should be less than 5MB');
          return;
        }

        // Accept only 1 file 
        if(myDropzone.files.length > 1){
          myDropzone.removeFile(myDropzone.files[0]);
        }

        if(file){
          // checking if user uploaded image or video
          let typeOfData = file.type.substring(0,5);
          if(typeOfData === 'image'){
            setImageUploaded(true);
          }
          else setImageUploaded(false);

          const reader = new FileReader();
          reader.onload = () => {
            const fileDataUrl = reader.result; 
            setUploadDocUrl(fileDataUrl);
          };
          reader.readAsDataURL(file); 

        }
      });

      return () => {
        myDropzone.destroy();
      };
    }
  }, []);

  const handleFileChange = (event) =>{
    // Don't allow user to upload file above 5MB
    if(event.target.files[0] && event.target.files[0].size > 5242880){
      event.target.value = "";
      toast.error('File size should be less than 5MB');
      return ;
    }

    if(event.target.files[0]){
      const reader = new FileReader();
      reader.onload = () => {
        const fileDataUrl = reader.result; 
        setUploadDocUrl(fileDataUrl);
      };
      reader.readAsDataURL(event.target.files[0]); 
      // checking if user uploaded image or video
      let typeOfData = event.target.files[0].type.substring(0,5);
      if(typeOfData === 'image'){
        setImageUploaded(true);
      }
      else setImageUploaded(false);
    }
  }

  const goBackHandler = () => {
    if(showCaptionSection){
      setShowCaptionSection(false);
      return ;
    } 
    setShowDiscardPostModal(true);
  }

  const handleSharePost = async() =>{
    // This click is for writing the caption
    if(!showCaptionSection){
      setShowCaptionSection(true);
      return ;
    }

    // sending data to database
    const toastId = toast.loading('Loading...');
    try{
      const token = sessionStorage.getItem('token');
      const data = {caption:caption,url:uploadDocUrl,type:imageUploaded ? 'Image' : 'Video'};
      const response = await axios.post(CREATE_NEW_POST, data, {
        headers : {
          Authorization: `Bearer ${token}`
        }
      });
      if(response?.data?.success){
        toast.dismiss(toastId);
        toast.success(response?.data?.message);
        setShowPostCreation(false);
      }
    }catch(error){
      toast.dismiss(toastId);
      if(error?.response?.data?.message)
        toast.error(error?.response?.data?.message);
      else toast.error('Internal Server error')
    }
    toast.dismiss(toastId);
  }

  // Close create Post 
  const closeCreatePost = () => {
    setShowPostCreation(false);
    navigate('/Welcome/Home');

  }

  return (
    <div className='absolute flex flex-col justify-center items-center h-screen w-screen bg-black bg-opacity-50'>
        <RxCross2 onClick={closeCreatePost} className='relative self-end -top-[6.5%] right-[1.2%] text-white text-[1.4rem] stroke-1 cursor-pointer'/>
        {
            uploadDocUrl && <div className={`bg-white rounded-[0.8rem] ${showCaptionSection ? "w-[60vw] smoothWidthIncrease" : "w-[40vw]"} h-[80vh]`}>
                <div className='flex justify-between border-gray-500 border-b py-[0.5rem] text-[1.2rem] px-[1rem]'>
                    <GoArrowLeft onClick={goBackHandler} className='text-[1.8rem] cursor-pointer'/>
                    <div className="font-bold">
                    {
                      showCaptionSection ? "Create new post" : "Confirm"
                    }
                    </div>
                    <p onClick={handleSharePost} className='text-[1.1rem] font-semibold text-[#0095F6] hover:text-black cursor-pointer'>
                      {
                        showCaptionSection ? "Share" : "Next"
                      }
                    </p>
                </div>
                <div className='flex'>
                  {
                    imageUploaded ? (<img src={uploadDocUrl} alt='Profile' loading='lazy' className={`${showCaptionSection ? "w-[65%]" : "w-full"} h-[75vh] rounded-b-[0.8rem]`}/>):
                    (<video controls className={`${showCaptionSection ? "w-[65%]" : "w-full"} h-[75vh] rounded-b-[0.8rem]`}>
                        <source src={uploadDocUrl} type="video/mp4"/>
                        Your browser does not support the video tag.
                     </video>)
                  }
                  {
                     <CaptionSection showCaptionSection={showCaptionSection} userCompleteData={userCompleteData}/>
                  }
                </div>
            </div>
        }
        {
          showDiscardPostModal && <DiscardPostModal setShowDiscardPostModal={setShowDiscardPostModal} setUploadDocUrl={setUploadDocUrl}/>
        }
        {
            !uploadDocUrl &&  <div className='bg-white rounded-[0.8rem] w-[40vw] h-[80vh]'>
                <div className="font-bold text-center border-gray-500 border-b py-[0.5rem] text-[1.2rem]">Create new post</div>
                <div ref={dropDownRef} className="dropzone flex flex-col justify-center items-center h-[92%]">
                    <svg
                    aria-label="Icon to represent media such as images or videos"
                    className="x1lliihq x1n2onr6 x5n08af mt-[4rem]"
                    fill="currentColor"
                    height="77"
                    role="img"
                    viewBox="0 0 97.6 77.3"
                    width="96"
                    >
                    <title>Icon to represent media such as images or videos</title>
                    <path
                        d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 
                            4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 
                            0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                        fill="currentColor"
                    ></path>
                    <path
                        d="M84.7 18.4 58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 
                            51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 
                            10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 
                            8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 
                            10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 
                            48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 
                            1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5-2 34c-.3 4.6-4.3 8.2-8.9 
                            7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                        fill="currentColor"
                    ></path>
                    <path
                        d="M78.2 41.6 61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 
                            2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                        fill="currentColor"
                    ></path>
                    </svg>
                <p className='font-normal text-[1.3rem] mt-[0.8rem]'>Drag photos and videos here</p>
                <input type="file" id="files" onChange={handleFileChange} accept="image/*, video/*" className="hidden" />
                <label htmlFor="files" className='bg-[#0095F6] text-white font-semibold text-[0.875rem] leading-[1.125rem] py-[0.438rem]
                px-[1rem] rounded-md cursor-pointer mt-[1rem]'>Select From Computer</label>
                </div>
            </div>
        }
    </div>
  );
};
