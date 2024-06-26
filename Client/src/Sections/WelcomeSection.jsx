import React, { useState } from 'react'
import socailspherelogo from '../Asserts/Logo/socailsphereNameLogo.svg'
import { SidebarData } from '../Data/Welcome/SidebarData'
import { RxHamburgerMenu } from "react-icons/rx";
export const WelcomeSection = () => {

    const [sideBarActive, setSideBarActive] = useState([true,false,false,false,false,false]);

    const changeActiveSection = (Id) => {
        const arr = [false,false,false,false,false,false];
        arr[Id] = true ;
        setSideBarActive(arr);
    }
  return (
    <div>

        {/* SideBar  */}
        <div className='flex flex-col gap-y-[8rem] pl-[1rem] pt-[1rem] h-screen'>
            <img src={socailspherelogo} loading='lazy' alt='Logo' className='w-[9rem]'/>
            <div className='-mt-[6rem] flex flex-col gap-y-[2.5rem] grow'>
                {
                    SidebarData?.map((data) => (
                        <div onClick={() => changeActiveSection(data?.Id - 1)} key={data?.Id} className='flex gap-x-[0.5rem] cursor-pointer items-center'>
                            {data?.Icon}
                            <p className={`text-[1.1rem] ${sideBarActive[data?.Id - 1] ? "font-bold" : ""}`}>{data?.Name}</p>
                        </div>
                    ))
                }
            </div>
            <div className='flex gap-x-[0.5rem] cursor-pointer items-center'>
                <RxHamburgerMenu />
                <p>More</p>
                
            </div>
        </div>
    </div>
  )
}
