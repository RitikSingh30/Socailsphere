import React from 'react'
import lockicon from '../Asserts/lockicon.png'
import { useLocation } from 'react-router-dom'
import "../CSS/Signup.css";
import { useForm } from 'react-hook-form';
import { Btn } from './Buttons/Btn';

export const Otp = () => {
    const { register, handleSubmit } = useForm();
    const location = useLocation();
    const userData = location.state ;
    const userEmail = userData?.Email.substring(0,5);
    console.log(userData)
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='border-[1px] border-[#DBDBDB] flex flex-col items-center pt-[3rem] p-[2rem] max-w-[400px]'>
            <img src={lockicon} loading='lazy' alt='icon'/>
            <p className='text-center mt-[1.5rem]'>Enter the code that we sent via E-mail
            to your mobile or desktop : {userEmail}********gmail.com</p>
            <div className="relative border-[#DBDBDB] border-[1px] bg-[#FAFAFA] pr-[0.5rem] rounded-md mt-[1rem] w-[90%]">
              <input
                type="password"
                name="otp"
                required
                {...register("otp", { required: true })}
                className="bg-[#FAFAFA] leading-[2.25rem] outline-none px-[0.5rem] w-full h-[3.4rem] pt-[0.6rem]"
              />
              <span className="floating-label text-[0.75rem] text-[#737373]">
                Security Code
              </span>
            </div>
            <Btn content={"Confirm"} xPadding={"px-[6.738rem] rounded-[8px]"} margin={"mt-[1rem]"} width={"w-[90%]"}/>
            <div className='mt-[1.3rem]'>
                <p>Didn't get a security code?</p>
                <p className='text-[#0095F6]'>Send code via SMS instead</p>
            </div>
        </div>
    </div>
  )
}
