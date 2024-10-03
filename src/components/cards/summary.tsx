import React from 'react'
import { AiOutlineExclamationCircle } from "react-icons/ai";


const Summary = ({ header, data, className}: {header: string, data: string, className: string}) => {
   return (
      <div className={`w-[13rem] h-full flex rounded-xl border border-black shadow-sm flex-col justify-center items-center relative ${className}`}>
         <span className="absolute top-2 right-4 rounded-full flex justify-center items-center hover:cursor-pointer">
         <AiOutlineExclamationCircle fontSize={18}/>
         </span>
         <div>
            <p className="text-md font-semibold">{header}</p>
            <p className="text-3xl">{data}</p>
         </div>
      </div>
   )
}

export default Summary