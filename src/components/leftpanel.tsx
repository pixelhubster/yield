"use client"
import React, { useState } from 'react'
import { landData } from './landData'
import LandParcel from './landParcel'
import { FaRegCopy } from "react-icons/fa6";
import Image from 'next/image';
import maize from "../../public/maize.webp"

const Leftpanel = () => {
   const [tab, setTab] = useState<boolean>(false)
   return (
      <div className="w-[20rem] xl:w-[25%] sm:w-[25rem] h-full bg-red-400 p-5 flex flex-col">

         <div className="w-full h-[15rem] bg-yellow-300 rounded-xl shrink-0 overflow-hidden shadow-lg">
            <Image src={maize} alt='' className='w-full h-full' />
         </div>
         <div className="mb-4 m-3 flex flex-col items-center">
            <p className='font-bold text-black'>nyuiela.base.eth</p>
            <div>0x5444....334 <button><FaRegCopy /></button></div>
         </div>


         <div className='w-full h-full max-h-full bg-white mt-8 pt-8 rounded-xl px-5 shrink overflow-hidden'>
            <div className="w-full h-[3.5rem] rounded-full flex justify-center items-center bg-black p-[6px]">
               <button type="button" className={`w-1/2 h-full ${!tab ? 'bg-blue-700' : 'bg-transparent'} rounded-3xl`} onClick={() => setTab(false)}>Properties</button>
               <button type="button" className={`w-1/2 h-full ${tab ? 'bg-blue-700' : 'bg-transparent'} rounded-3xl`} onClick={() => setTab(true)}>History</button>
            </div>

            <div className='w-[20rem] h-[80%] flex shrink overflow-auto mt-8 rounded-xl'>
               {!tab ?
                  <LandParcel landData={landData} />
                  // <div className='w-full h-full bg-red-300'>
                  //    {/* Owner and ID */}
                  //    <div className="border-b pb-4 mb-4">
                  //       <p><span className="font-semibold">Land ID:</span> {landData.landID}</p>
                  //       <p><span className="font-semibold">Current Owner:</span> {landData.owner}</p>
                  //    </div>

                  // </div>
                  : ""
               }

            </div>
         </div>

      </div>
   )
}

export default Leftpanel