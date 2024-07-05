import React, { useEffect, useState } from 'react'
import { Btn } from './Buttons/Btn'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { UPDATE_USER_PROFILE_INFO } from '../API_Endpoint/UpdateUserProfile';
import { RxCross2 } from "react-icons/rx";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hide } from '../Slices/showEditProfileSlice';

export const InitialProfileSetup = ({userCompleteData,Email,setUserCompleteData}) => {
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const { register, handleSubmit } = useForm();

    useEffect(() => {
        setFullName(userCompleteData?.FullName);
    },[userCompleteData]);
    
    // Handle change in input field
    const handleInputChange = (e) => {
        setFullName(e.target.value);
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    }

    const convertBase64 = (file) => {
        return new Promise((resolve,reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const onsubmit = async(data) => {
        const toastId = toast.loading('Loading...');
        try{
            data.FullName = fullName ;
            data.Email = Email ;
            if(selectedFile){
                data.File = await convertBase64(selectedFile);
            }
    
            const response = await axios.post(UPDATE_USER_PROFILE_INFO,data);
            if(response?.data?.success){
                toast.dismiss(toastId);
                setUserCompleteData(response?.data?.userData);
                toast.success(response?.data?.message);
            }

        }catch(error){
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message);
        }
        toast.dismiss(toastId)
    }

  return (
    <div className='absolute w-screen h-screen flex justify-center items-center backdrop-blur-lg'>
        <form onSubmit={handleSubmit(onsubmit)} className='border-[2px] border-[#000000] p-[1rem] rounded-md flex flex-col gap-y-[5rem]'>
            <div className='flex items-center justify-between'>
                <h2 className='text-[1.875rem] font-semibold'>Edit Profile</h2>
                <RxCross2 onClick={() => {
                    dispatch(hide());
                }} className='text-[1.5rem] cursor-pointer'/>
            </div>
            <div className='-mt-[4rem] flex flex-col gap-y-[0.5rem]'>
                <div className='bg-[#CDCDCD] flex items-center px-[0.5rem] pr-[1rem] py-[0.5rem] rounded-[1rem] gap-x-[1rem]'>
                    <img src={userCompleteData?.ProfilePicture} alt='Profile' loading='lazy' className='w-[5rem] rounded-[2rem]'/>
                    <p className='text-[1.25rem] mr-[4rem] fond-semibold'>{userCompleteData?.FullName}</p>
                    <input type="file" id="files" onChange={handleFileChange} className="hidden" />
                    <label htmlFor="files" className='bg-[#0095F6] text-white font-semibold text-[0.875rem] leading-[1.125rem] py-[0.438rem]
                    px-[0.75rem] rounded-md cursor-pointer'>Change Photo</label>
                </div>
                <div>
                    <p className='text-[1.25rem] font-semibold'>Name</p>
                    <input type='text' onChange={handleInputChange} value={fullName || ""} 
                    className='text-[1.25rem] font-semibold bg-[#CDCDCD] w-full
                    rounded-[1rem] p-[1rem] py-[0.5rem]'/>
                </div>
                <div>
                    <p className='text-[1.25rem] font-semibold'>Bio</p>
                    <textarea {...register("Bio")} maxLength="100" rows="7" cols="15" className='bg-[#CDCDCD] w-full rounded-[1rem] p-[0.5rem]'/>
                </div>
                <div className='flex gap-x-[0.5rem]'>
                    <p className='text-[1.25rem] font-semibold'>Gender</p>
                    <select {...register('Gender')}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
            </div>
            <Btn content={"Submit"} BorderRadius={"rounded-md"}/>
        </form>
    </div>
  )
}
