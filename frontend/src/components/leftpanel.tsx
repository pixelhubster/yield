"use client"
import React, { useEffect, useState } from 'react'
// import LandParcel from './landParcel'
import { useRouter, useSearchParams } from 'next/navigation';
import RegisterYieldModal from './modals/registerYield';
import ListYield from './modals/listYield';
import BuyYieldModal from './modals/buyYield';
import { gql } from 'graphql-request';
import queryContract, { getName, shortenAddress } from '@/app/context/query';
import History from './history';
import dynamic from 'next/dynamic';
import { IoMdClose } from 'react-icons/io';

const LandParcel = dynamic(() => import("./landParcel"), { ssr: true })
const Leftpanel = () => {
   const [tab, setTab] = useState<boolean>(false)
   const searchParams = useSearchParams()
   const [data, setData] = useState<any>()
   // console.log(searchParams.get("search"))
   // const getUnixTimestamp = () => {
   //    const timestamp = Math.floor(Date.now() / 1000); // Divides by 1000 to get seconds
   //    return timestamp;
   // };
   console.log(Number(searchParams.get("search")) === 0 && 1)
   const query = gql` {
     yieldMinteds(where: {landTokenId: ${Number(searchParams.get("search"))}}) {
       id
       yieldId
       landTokenId
       yieldType
       owner
       transactionHash
       blockTimestamp
       amount
       blockNumber
     }
   }`


   useEffect(() => {
      async function get() {
         const res = await queryContract(query);
         if (res.success) setData(res.data)
      }
      get()
   }, [query, searchParams])
   // console.log(data)
   // const get = async () => {
   //    const date = getUnixTimestamp()
   //    const polygon = "670041676419591af8d66659";
   //    const appid = "3b87578fd3bdb941cfe5b24122812690";
   //    try {
   //       const res = await fetch(`https://api.agromonitoring.com/agro/1.0/image/search?start=${date - 86400}&end=${date}&polyid=${polygon}&appid=${appid}`)
   //       const data = await res.json()
   //       // console.log(data)
   //       return data

   //    } catch (error) {
   //       console.log(error)
   //    }
   // }
   // get()
   return (
      <div className={`w-[20rem] xl:w-[25%] sm:w-[25rem] h-full p-5 flex flex-col flex-none max-lg:bg-white max-lg:z-[40] max-lg:absolute max-lg:top-0 max-lg:shadow-md
         ${searchParams.get("tab") ? "max-lg:flex" : "max-lg:hidden"}
         `}>
         {/* <div className='w-full h-[4rem] bg-red-00 mb-5 flex justify-end items-center lg:hidden'>
            <IoMdClose fontSize={30} color='black' className='hover:bg-gray-200 rounded'/>
         </div> */}
         <div className='card w-full pb-0 h-[20rem] bg-[#150578] flex justify-center items-center text-white text-4xl font-semibold'>
            <p className='flex gap-2 items-end'>{data?.yieldMinteds[0]?.amount || 0}
               {/* <p className='font-bold text-sm text-white'>{data?.yieldMinteds[0].yieldType}</p> */}

            </p>
            <p className='text-sm text-gray-300'>Total Supply</p>
            {/* <p className='font-bold text-sm text-white'>{getName(data?.yieldMinteds[0].owner)}</p> */}
            <p className='font-bold text-sm text-white'>{data?.yieldMinteds[0]?.owner && shortenAddress(data?.yieldMinteds[0]?.owner)}</p>
            <div className='w-full flex justify-center gap-2 pt-8 bottom-5 flex-shrink px-3 z-[20]'>
               <RegisterYieldModal id={data?.yieldMinteds[0]?.yieldId} />
               {data?.yieldMinteds.length > 0 &&
                  <>
                     <ListYield id={data?.yieldMinteds[0]?.yieldId || 0} />
                     <BuyYieldModal id={data?.yieldMinteds[0]?.yieldId || 0} />
                  </>
               }
            </div>
         </div>
         <div className='w-full h-full max-h-full bg-[#14213d]/80 mt-4 pt-4 rounded-xl px-3 shrink overflow-hidden'>
            <div className="w-full h-[3.3rem] rounded-full flex justify-center items-center bg-black p-[6px]">
               <button type="button" className={`w-1/2 text-[14px] h-full ${!tab ? 'bg-blue-700' : 'bg-transparent'} rounded-3xl`} onClick={() => setTab(false)}>Properties</button>
               <button type="button" className={`w-1/2 text-[14px] h-full ${tab ? 'bg-blue-700' : 'bg-transparent'} rounded-3xl`} onClick={() => setTab(true)}>History</button>
            </div>

            <div className='w-full h-[85%] overflow-auto mt-4'>
               {!tab ?
                  <LandParcel id={Number(searchParams.get("search"))} />
                  : <History id={Number(searchParams.get("search"))} />
               }
            </div>
         </div>

      </div>
   )
}

export default Leftpanel