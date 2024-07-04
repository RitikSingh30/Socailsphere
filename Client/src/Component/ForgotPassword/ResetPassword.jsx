import React from "react";
import keylogo from '../../Asserts/Forget Password/keylogo.png'
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import {useState} from 'react'
import {Btn} from '../Buttons/Btn'
import {ForgetPasswordInput} from '../../Data/ForgetPassword/ForgetPassword'
import {toast} from 'react-hot-toast'
import axios from "axios";
import { RESET_PASSWORD } from "../../API_Endpoint/ForgotPassword";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
  const userData = location.state ;

  const onsubmit = async(data) => {
    const toastId = toast.loading('Loading...');
    try{
      data.Email = userData.Email ;

      if(data.Password !== data?.confirmPassword){
        toast.error('Password and Confirm Password should be same');
      }

      const response = await axios.post(RESET_PASSWORD,data);
      console.log(response)
      if (response?.data?.success) {
        toast.dismiss(toastId);
        toast.success(response?.data?.message);
        navigate('/password-change-successful');
        
      }
    }catch(error){
      console.log(error)
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
  }

  return <div className="flex justify-center items-center h-screen">
    <div className='flex flex-col items-center border-[1px] border-[#DBDBDB] p-[2.5rem] gap-y-[2rem] max-w-[350px]'>
      <div className="relative">
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="35" r="34" fill="white" stroke="black" stroke-width="2"/>
        </svg>
        <img src={keylogo} alt="key logo" loading="lazy" className="w-[2.763rem] absolute top-[0.7rem] left-[0.8rem]"/>
      </div>
      <p className='text-[1.25rem]'>Set new password</p>
      <p className="text-center -mt-[1rem]">Your new password must be different to previously used password</p>
      <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-y-[1.5rem]">
        <div className="flex flex-col gap-y-[6px]">
          {ForgetPasswordInput?.map((data) => (
            <div
              key={data?.Id}
              className="flex items-center relative border-[#DBDBDB] border-[1px] bg-[#FAFAFA] pr-[0.5rem] rounded-md"
            >
              <input
                type={`${
                  data?.Placeholder === "Password" ? showPassword ? "text" : 'password' : showConfirmPassword ? 'text' : 'password'
                }`}
                name={data?.Name}
                required
                {...register(`${data?.Name}`, { required: true })}
                className="bg-[#FAFAFA] leading-[2.25rem] outline-none px-[0.5rem] w-full h-[3.4rem] pt-[0.6rem]"
              />
              <span className="floating-label text-[0.75rem] text-[#737373]">
                {data?.Placeholder}
              </span>
              {
                data?.Placeholder === "Password" ? showPassword ? <IoEyeOutline
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
                /> : <IoEyeOffOutline
                onClick={() => setShowPassword(!showPassword)}
                className="cursor-pointer"
                /> : showConfirmPassword ?  <IoEyeOutline
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="cursor-pointer"
                /> : <IoEyeOffOutline
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="cursor-pointer"
                />
            }
            </div>
          ))}
        </div>
        <Btn content={"Reset Password"} xPadding={"px-[4.738rem] rounded-[8px]"}/>
      </form>
    </div>
  </div>;
};

export default ResetPassword;
