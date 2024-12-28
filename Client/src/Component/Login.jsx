import React, { useState } from "react";
import { LoginData } from "../Data/Login/Login";
import { Btn } from "./Buttons/Btn";
import { useForm } from "react-hook-form";
import { LOGIN_REQUEST } from "../API_Endpoint/LoginAPI";
import "../CSS/Signup.css";
import socailsphereNameLogo from "../Asserts/Logo/socailsphereNameLogo.svg";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data) => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await axios.post(LOGIN_REQUEST, data);
      if (response?.data?.success) {
        toast.dismiss(toastId);
        toast.success(response?.data?.message);
        sessionStorage.setItem('token',response?.data?.token);
        navigate("/Welcome");
      }
      }catch (error) {
        toast.dismiss(toastId);
        if(error?.response?.data?.message)
          toast.error(error?.response?.data?.message);
        else toast.error('Internal Server error')
      }
    toast.dismiss(toastId)
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-[#DBDBDB] w-[24.875rem] p-10 pt-4 flex flex-col gap-y-10 rounded-sm"
      >
        <img
          src={socailsphereNameLogo}
          alt="SocialSphere Name Logo"
          loading="lazy"
          className="cursor-pointer mx-auto"
        />

        <div className="flex flex-col gap-y-1.5">
          {LoginData.map((data) => (
            <div
              key={data.Id}
              className="relative border-[#DBDBDB] border-[1px] bg-[#FAFAFA] pr-[0.5rem] rounded-md"
            >
              <input
                type={
                  data.Name === "Password" && !showPassword
                    ? "password"
                    : "text"
                }
                name={data?.Name}
                {...register(data?.Name, { required: true })}
                required
                className="bg-[#FAFAFA] leading-[2.25rem] outline-none px-[0.5rem] w-full h-[3.4rem] pt-[0.6rem]"
              />
              <span className="floating-label text-[0.75rem] text-[#737373]">
                {data.Placeholder}
              </span>
              {data.Placeholder === "Password" &&
                (showPassword ? (
                  <IoEyeOutline
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-[50%] right-3 -translate-y-1/2 cursor-pointer"
                  />
                ) : (
                  <IoEyeOffOutline
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-[50%] right-3 -translate-y-1/2 cursor-pointer"
                  />
                ))}
            </div>
          ))}
        </div>

        <Btn
          content="Log in"
          xPadding="px-28"
          margin="-mt-6"
          className="rounded-md"
        />

        <div className="flex items-center justify-center">
          <Link
            to="/forgot-password"
            className="text-[#00376B] text-sm font-medium"
          >
            Forgot password?
          </Link>
        </div>
      </form>

      <div className="text-black text-sm leading-5 font-normal border border-[#DBDBDB] w-[24.875rem] text-center py-6 mt-4">
        Don't have an account?{" "}
        <Link to="/signup">
          <span className="text-[#0095F6] font-semibold cursor-pointer">
            Sign up
          </span>
        </Link>
      </div>
    </div>
  );
}
