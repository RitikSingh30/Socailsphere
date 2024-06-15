import React from "react";
import { LoginData } from "../Data/Login/Login.js";
import { Btn } from "./Buttons/Btn";
import socailsphereNameLogo from "../Asserts/Logo/socailsphereNameLogo.svg";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-y-2">
      <div className="border border-[#DBDBDB] w-[21.875rem] p-10 pt-4 flex flex-col gap-y-10 rounded-sm">
        <img
          src={socailsphereNameLogo}
          alt="SocialSphere Name Logo"
          loading="lazy"
          className="cursor-pointer mx-auto"
        />

        <div className="flex flex-col gap-y-1.5">
          {LoginData?.map((data) => (
            <input
              key={data?.Id}
              type={data?.Type}
              name={data?.Name}
              placeholder={data?.Placeholder}
              aria-label={data?.Placeholder}
              className="bg-[#FAFAFA] border-[#DBDBDB] border rounded-sm text-sm leading-9 outline-none px-2"
            />
          ))}
        </div>

        <Btn
          content={"Log in"}
          xPadding={"px-28 rounded-md"}
          margin={"-mt-6"}
        />
        <div className="flex items-center justify-center ">
          <a href="/" className="text-[#00376B] text-sm font-medium">
            Forgot password?
          </a>
        </div>
      </div>
      <div className="text-black text-sm leading-5 font-normal border border-[#DBDBDB] w-[21.875rem] text-center py-6 mt-4">
        Dont have an Account?{" "}
        <Link to="/signup">
          <span className="text-[#0095F6] font-semibold cursor-pointer">
            Sign up
          </span>
        </Link>
      </div>
    </div>
  );
}
