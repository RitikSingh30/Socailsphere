import React from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Email_png from "../../Asserts/email 1.png";
import { Btn } from "../Buttons/Btn";
import axios from "axios";
import toast from "react-hot-toast";
import { Verify_Otp_Api } from "../../API_Endpoint/VerifyOtp";
import { SEND_OTP } from "../../API_Endpoint/SendOtp";

const EnterOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const ResendOtp = async () => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await axios.post(SEND_OTP, {
        Email: userData.Email,
      });
      if (response?.data?.success) {
        toast.dismiss(toastId);
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await axios.post(Verify_Otp_Api, {
        Email: userData.Email,
        Otp: data.Otp,
      });
      if (response?.data?.success) {
        toast.dismiss(toastId);
        toast.success(response?.data?.message);
        navigate("/reset-password",{state:userData});
      }
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(error?.response?.data?.message);
    }
    toast.dismiss(toastId);
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-[0.5rem]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-[1px] border-[#DBDBDB] w-[24.875rem] p-[2.4rem] pt-[1rem] flex flex-col gap-y-[2.5rem] rounded-[3px]"
      >
        <img src={Email_png} alt="Email" className="w-20 h-20 mx-auto" />
        <h1 className="font-semibold text-[#737373] text-[1rem] leading-[1.25rem] text-center -mt-[2.3rem]">
          Check Your Email
        </h1>
        <p className="text-[#737373] text-center">
          We recently sent a code to your email
        </p>
        <div className="relative flex flex-col gap-y-[6px]">
          <input
            type="text"
            {...register("Otp", {
              required: "Code is required",
            })}
            placeholder="Enter code here"
            className="bg-[#FAFAFA] leading-[2.25rem] outline-none px-[0.5rem] w-full h-[3.4rem] pt-[0.6rem] border-[#DBDBDB] border-[1px] bg-[#FAFAFA] rounded-md peer"
          />
          {errors.Otp && (
            <span className="text-red-600 text-[0.75rem]">
              {errors.Otp.message}
            </span>
          )}
        </div>
        <Btn
          content={"Verify Code"}
          xPadding={"px-[6.738rem]"}
          BorderRadius={"rounded-md"}
          margin={"-mt-[1.5rem]"}
          type="submit"
        />
        <p className="text-center text-[#737373]">
          Didn't receive the email?{" "}
          <span
            onClick={ResendOtp}
            className="text-blue-500 cursor-pointer"
            role="button"
          >
            Click to resend
          </span>
        </p>
      </form>
    </div>
  );
};

export default EnterOtp;
