import React from "react";
import successfulTick from '../../Asserts/Forget Password/successfulTick.png'
import { Btn } from "../Buttons/Btn";
import { useNavigate } from "react-router-dom";
const SuccesfulPasswordReset = () => {
  const navigate = useNavigate();

  return <div className="flex items-center justify-center h-screen">
    <div className="flex flex-col items-center border-[1px] border-[#DBDBDB] max-w-[350px] p-[3rem] px-[2rem] pb-[2.5rem] gap-y-[1rem]">
      <img src={successfulTick} alt="successful" loading="lazy" className="w-[75px]"/>
      <p className="text-[1.25rem]">Password Reset</p>
      <p className="text-center">Yor password has been successfully reset. Click below to login</p>
      <Btn content={"Continue"} xPadding={"px-[4.738rem] rounded-[8px]"} onclick={() => navigate('/login')}/>
    </div>
  </div>;
};

export default SuccesfulPasswordReset;
