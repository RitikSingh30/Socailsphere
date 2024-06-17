import React from "react";
import socailsphereNameLogo from "../Asserts/Logo/socailsphereNameLogo.svg";
import { SignupInput } from "../Data/Signup/SignupInput";
import { Btn } from "./Buttons/Btn";
import "../CSS/Signup.css";
import { useForm } from "react-hook-form";
import { RxCrossCircled } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import { SIGNUP_VERIFICATION_URL } from "../API_Endpoint/SignupAPI";
import axios from 'axios';

export const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async(data) => {

    try{
      const response = await axios.post(SIGNUP_VERIFICATION_URL,data);
      if(response?.data?.success){
        navigate('/otp',{state:data});
      }

    }catch(error){
      
    }
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-[0.5rem]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-[1px] border-[#DBDBDB] w-[24.875rem] p-[2.4rem] pt-[1rem] flex flex-col gap-y-[2.5rem] rounded-[3px]"
      >
        <img
          src={socailsphereNameLogo}
          alt="instagramNameLogo"
          loading="lazy"
          className="cursor-pointer mx-auto"
        />
        <p className="font-semibold text-[#737373] text-[1rem] leading-[1.25rem] text-center -mt-[2.3rem]">
          Sign up to see photos and videos from your friends.
        </p>
        <div className="flex flex-col gap-y-[6px]">
          {SignupInput?.map((data) => (
            <div
              key={data?.Id}
              className="flex items-center relative border-[#DBDBDB] border-[1px] bg-[#FAFAFA] pr-[0.5rem] rounded-md"
            >
              <input
                type={data?.Type}
                name={data?.Name}
                required
                {...register(`${data?.Name}`, { required: true })}
                className="bg-[#FAFAFA] leading-[2.25rem] outline-none px-[0.5rem] w-full h-[3.4rem] pt-[0.6rem]"
              />
              <span className="floating-label text-[0.75rem] text-[#737373]">
                {data?.Placeholder}
              </span>
              <RxCrossCircled className="text-red-500 text-[1.5rem]" />
            </div>
          ))}
        </div>
        <div className="text-[0.75rem] -mt-[1.5rem] flex flex-col gap-y-[1rem]">
          <p className="text-[#737373] font-normal text-center">
            People who use our service may have uploaded your contact
            information to Socailsphere.{" "}
            <span className="text-[#385898] cursor-pointer">Learn more</span>
          </p>
          <p className="text-[#737373] font-normal text-center">
            By signing up, you agree to our{" "}
            <span className="text-[#385898] cursor-pointer">
              Terms, Privacy Policy{" "}
            </span>{" "}
            and{" "}
            <span className="text-[#385898] cursor-pointer">
              Cookies Policy.
            </span>
          </p>
        </div>
        <Btn
          content={"Sign Up"}
          xPadding={"px-[6.738rem] rounded-[8px]"}
          margin={"-mt-[1.5rem]"}
        />
      </form>
      <div className="text-[#000000] text-[0.875rem] leading-[1.125rem] font-normal border-[1px] border-[#DBDBDB] w-[24.875rem] text-center py-[1.5rem]">
        Have an account?{" "}
        <Link to="/login">
          <span className="text-[#0095F6] font-semibold cursor-pointer">
            Log in
          </span>
        </Link>
      </div>
    </div>
  );
};
