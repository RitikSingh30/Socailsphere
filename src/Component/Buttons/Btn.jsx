import React from 'react'

export const Btn = ({content,xPadding,margin}) => {
  return (
    <button className={`${xPadding} ${margin} bg-[#0095F6] text-white font-semibold text-[0.875rem] leading-[1.125rem] py-[0.438rem]`}>
        {content}
    </button>
  )
}
