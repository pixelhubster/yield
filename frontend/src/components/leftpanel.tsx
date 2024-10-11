"use client"
import React, { useState } from 'react'
import LandParcel from './landParcel'
import { useSearchParams } from 'next/navigation';
import RegisterYieldModal from './modals/registerYield';
import ListYield from './modals/listYield';
import BuyYieldModal from './modals/buyYield';

const Leftpanel = () => {
   const [tab, setTab] = useState<boolean>(false)
   const searchParams = useSearchParams()
   const [search, setSearch] = useState<string | number | null>(searchParams.get("search"))

   const getUnixTimestamp = () => {
      const timestamp = Math.floor(Date.now() / 1000); // Divides by 1000 to get seconds
      return timestamp;
   };

   //  console.log(getUnixTimestamp());  // 
   const get = async () => {
      const date = getUnixTimestamp()
      const polygon = "670041676419591af8d66659";
      const appid = "3b87578fd3bdb941cfe5b24122812690";
      try {
         const res = await fetch(`https://api.agromonitoring.com/agro/1.0/image/search?start=${date - 86400}&end=${date}&polyid=${polygon}&appid=${appid}`)
         const data = await res.json()
         // console.log(data)
         return data

      } catch (error) {
         console.log(error)
      }
   }
   // get()
   return (
      <div className="w-[20rem] xl:w-[25%] sm:w-[25rem] h-full p-5 flex flex-col flex-none max-lg:hidden">
         <div className='card w-full pb-0 h-[20rem] bg-[#150578] flex justify-center items-center text-white text-4xl font-semibold'>
            <p>200</p>
            <p className='text-sm text-gray-300'>Total Supply</p>
            <p className='font-bold text-sm text-white'>nyuiela.base.eth</p>
            <div className='w-full flex justify-center gap-2 pt-8 bottom-5 flex-shrink px-3'>
               <RegisterYieldModal />
               <ListYield />
               <BuyYieldModal />
            </div>
         </div>
         <div className='w-full h-full max-h-full bg-white mt-8 pt-8 rounded-xl px-5 shrink overflow-hidden'>
            <div className="w-full h-[3.5rem] rounded-full flex justify-center items-center bg-black p-[6px]">
               <button type="button" className={`w-1/2 h-full ${!tab ? 'bg-blue-700' : 'bg-transparent'} rounded-3xl`} onClick={() => setTab(false)}>Properties</button>
               <button type="button" className={`w-1/2 h-full ${tab ? 'bg-blue-700' : 'bg-transparent'} rounded-3xl`} onClick={() => setTab(true)}>History</button>
            </div>

            <div className='w-full h-[80%] overflow-auto mt-8'>
               {!tab ?
                  <LandParcel id={search as number} />
                  : ""
               }

            </div>
         </div>

      </div>
   )
}

export default Leftpanel