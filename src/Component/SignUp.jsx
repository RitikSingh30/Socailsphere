import React from 'react'
import socailsphereNameLogo from '../Asserts/Logo/socailsphereNameLogo.svg'
import { SignupInput } from '../Data/Signup/SignupInput'
import { Btn } from './Buttons/Btn'

export const SignUp = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen gap-y-[0.5rem]'>
        <div className='border-[1px] border-[#DBDBDB] w-[21.875rem] p-[2.4rem] pt-[1rem] flex flex-col gap-y-[2.5rem] rounded-[3px]'>
            <img src={socailsphereNameLogo} alt='instagramNameLogo' loading='lazy' className='cursor-pointer mx-auto'/>
            <p className='font-semibold text-[#737373] text-[1rem] leading-[1.25rem] text-center -mt-[2.3rem]'>Sign up to see photos and videos from your friends.</p>
            <div className='flex flex-col gap-y-[6px]'>
                {
                    SignupInput?.map((data) => (
                        <input key={data?.Id} type={data?.Type} name={data?.Name} placeholder={data?.Placeholder} 
                        className='bg-[#FAFAFA] border-[#DBDBDB] border-[1px] rounded-sm text-[0.75rem] leading-[2.25rem] outline-none px-[0.5rem]'/>
                    ))
                }
            </div>
            <div className='text-[0.75rem] -mt-[1.5rem] flex flex-col gap-y-[1rem]'>
                <p className='text-[#737373] font-normal text-center'>
                    People who use our service may have uploaded your contact information to Instagram. <span className='text-[#385898]'>Learn more</span>
                </p>
                <p className='text-[#737373] font-normal text-center'>
                    By signing up, you agree to our <span className='text-[#385898]'>Terms, Privacy Policy </span> and <span className='text-[#385898]'>Cookies Policy.</span>
                </p>
            </div>
            <Btn content={"Sign Up"} xPadding={"px-[6.738rem] rounded-[8px]"} margin={"-mt-[1.5rem]"}/>
        </div>
        <div className='text-[#000000] text-[0.875rem] leading-[1.125rem] font-normal border-[1px] border-[#DBDBDB] w-[21.875rem] text-center py-[1.5rem]'>
            Have an account? <span className='text-[#0095F6] font-semibold cursor-pointer'>Log in</span>
        </div>
    </div>
  )
}
