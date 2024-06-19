import React from 'react'
import socailspherelogo from '../Asserts/Logo/socailsphereNameLogo.svg'
import { SidebarData } from '../Data/Welcome/SidebarData'
import { RxHamburgerMenu } from "react-icons/rx";
export const WelcomeSection = () => {
  return (
    <div>

        {/* SideBar  */}
        <div>
            <img src={socailspherelogo} loading='lazy' alt='Logo' className='w-[7rem]'/>
            <div>
                {
                    SidebarData?.map((data) => (
                        <div key={data?.Id} className='flex gap-x-[0.5rem]'>
                            {data?.Icon}
                            <p className='text-[1.1rem]'>{data?.Name}</p>
                        </div>
                    ))
                }
            </div>
            <div className='flex gap-x-[0.5rem]'>
                <RxHamburgerMenu />
                <p>More</p>
            </div>
        </div>
    </div>
  )
}
