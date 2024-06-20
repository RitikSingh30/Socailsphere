import React from "react";
import Lock_Image from "../../Asserts/Button@3x.png";
import { Btn } from "../Buttons/Btn";
import axios from "axios";
import toast from "react-hot-toast";
import { Forgot_Password_Api } from "../../API_Endpoint/ForgotPassword";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(Forgot_Password_Api, data);
      if (response?.data?.success) {
        toast.success(response?.data?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-[0.5rem]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border-[1px] border-[#DBDBDB] w-[24.875rem] p-[2.4rem] pt-[1rem] flex flex-col gap-y-[2.5rem] rounded-[3px]"
      >
        <img src={Lock_Image} alt="Lock" className="w-20 h-20 mx-auto" />
        <h1 className="font-semibold text-[#737373] text-[1rem] leading-[1.25rem] text-center -mt-[2.3rem]">
          Forgot Password
        </h1>
        <p className="text-[#737373] text-center">
          We'll send you a reset code on your email
        </p>
        <div className="relative flex flex-col gap-y-[6px]">
          <input
            type="Email"
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
            className="bg-[#FAFAFA] leading-[2.25rem] outline-none px-[0.5rem] w-full h-[3.4rem] pt-[0.6rem] border-[#DBDBDB] border-[1px] bg-[#FAFAFA] rounded-md peer"
          />
          <label
            className={`floating-label text-[0.75rem] text-[#737373] absolute left-[0.75rem] top-[0.75rem] transition-all duration-300 ease-in-out ${
              errors.email ? "label-up" : ""
            }`}
          >
            Email
          </label>
          {errors.email && (
            <span className="text-red-600 text-[0.75rem]">
              {errors.email.message}
            </span>
          )}
        </div>
        <Btn
          content={"Confirm"}
          xPadding={"px-[6.738rem]"}
          BorderRadius={"rounded-md"}
          margin={"-mt-[1.5rem]"}
          type="submit"
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
