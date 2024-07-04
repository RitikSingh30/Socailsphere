import React, { useState } from 'react'
import lockicon from '../Asserts/lockicon.png'
import { useLocation, useNavigate } from 'react-router-dom'
import "../CSS/Signup.css";
import { useForm } from 'react-hook-form';
import { Btn } from './Buttons/Btn';
import axios from 'axios';
import { SIGNUP_URL } from '../API_Endpoint/SignupAPI';
import toast from 'react-hot-toast';
import { SEND_OTP} from '../API_Endpoint/SendOtp';
import { IoEyeOutline , IoEyeOffOutline} from "react-icons/io5";

export const Otp = () => {
    const [showPassword,setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const location = useLocation();
    const userData = location.state ;
    const userEmail = userData?.Email.substring(0,5);

    const onsubmit = async(data) => {
      const toastId = toast.loading('Loading...');
        try{
            userData.otp = data.otp ;
            const response = await axios.post(SIGNUP_URL,userData);
            if(response?.data?.success){
              toast.dismiss(toastId);
              toast.success(response?.data?.message);
              navigate('/Welcome',{state:{Email:userData?.Email,showInitialProfileSetup:true}});
            }
          }catch(error){
            toast.dismiss(toastId);
            toast.error(error?.response?.data?.message);
          }
        toast.dismiss(toastId);
    }

    const sendOtpAgain = async() => {
      const toastId = toast.loading('Loading...');
      try{
        const response = await axios.post(SEND_OTP,userData);
        if(response?.data?.success){
          toast.dismiss(toastId);
          toast.success(response?.data?.message);
        }
        }catch(error){
          toast.dismiss(toastId);
          toast.error(error?.response?.data?.message);
        }
      toast.dismiss(toastId);
    }

  return (
    <div className='flex items-center justify-center h-screen'>
        <form onSubmit={handleSubmit(onsubmit)} className='border-[1px] border-[#DBDBDB] flex flex-col items-center pt-[3rem] p-[2rem] max-w-[400px]'>
            <img src={lockicon} loading='lazy' alt='icon'/>
            <p className='text-center mt-[1.5rem]'>Enter the code that we sent via E-mail
            to your mobile or desktop : {userEmail}********gmail.com</p>
            <div className="relative border-[#DBDBDB] border-[1px] bg-[#FAFAFA] pr-[0.5rem] rounded-md mt-[1rem] w-[90%] flex items-center">
              <input
                type={`${!showPassword ? 'password' : 'text'}`}
                name="otp"
                required
                {...register("otp", { required: true })}
                className="bg-[#FAFAFA] leading-[2.25rem] outline-none px-[0.5rem] w-full h-[3.4rem] pt-[0.6rem]"
              />
              <span className="floating-label text-[0.75rem] text-[#737373]">
                Security Code
              </span>
              {
                showPassword ? <IoEyeOutline onClick={() => setShowPassword(!showPassword)} className="cursor-pointer"/> : 
                <IoEyeOffOutline  onClick={() => setShowPassword(!showPassword)}  className="cursor-pointer"/>
              }
            </div>
            <Btn content={"Confirm"} xPadding={"px-[6.738rem] rounded-[8px]"} margin={"mt-[1rem]"} width={"w-[90%]"}/>
            <div className='mt-[1.3rem]'>
                <p>Didn't get a security code?</p>
                <p onClick={sendOtpAgain} className='text-[#0095F6] text-center cursor-pointer'>Send code again</p>
            </div>
        </form>
    </div>
  )
}
