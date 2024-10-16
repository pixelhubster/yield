"use client"
import React, { useEffect, useRef } from 'react'
import { AiOutlineExclamationCircle } from "react-icons/ai";
import dynamic from 'next/dynamic';
const Summary = ({ header, data, unit, className }: { header: string, data: number,unit?: string, className: string }) => {
   const countupRef = useRef(null);

  useEffect(() => {
    async function initCountUp() {
      const { CountUp } = await import("countup.js")
      const countUpAnim = new CountUp(countupRef.current as any, data);
      if (!countUpAnim.error) {
        countUpAnim.start();
      } else {
        console.error(countUpAnim.error);
      }
    }

    if (countupRef.current) {
      initCountUp();
    }
  }, [data]);


  
   return (
      <div className={`w-[12rem] h-full flex rounded-xl border border-black shadow-sm flex-col justify-center items-center relative ${className}`}>
         <span className="absolute top-2 right-4 rounded-full flex justify-center items-center hover:cursor-pointer">
            <AiOutlineExclamationCircle fontSize={18} />
         </span>
         <div>
            <p className="text-md font-semibold">{header}</p>
            <p className="text-3xl" ref={countupRef}>{data} {unit}</p>
         </div>
      </div>
   )
}

export default Summary