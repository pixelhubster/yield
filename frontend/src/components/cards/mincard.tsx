"use client"
import React from 'react'
const Mincard = ({className}: {className?: string}) => {
   return (
      <div className={`w-1/2 h-full flex flex-col justify-center items-start p-5 relative text-black ${className}`}>
         <div>
            <p className="text-[12px] font-semibold ">Pool</p>
            <p className="text-[16px]">12%</p>
         </div>
      </div>
   )
}

export default Mincard