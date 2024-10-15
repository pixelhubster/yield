"use client"
import React from 'react'
const Mincard = ({name, value, className}: {name: string, value: string, className?: string}) => {
   return (
      <div className={`w-1/2 h-full flex flex-col justify-center items-start p-5 relative text-black ${className}`}>
         <div>
            <p className="text-[12px] font-semibold ">{name} <i className='text-[9px] text-gray-700'>(coming soon)</i></p>
            <p className="text-[16px]">{value}</p>
         </div>
      </div>
   )
}

export default Mincard