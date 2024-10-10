"use client"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import LiquidateModal from './modals/liquidate'

const Navbar = () => {
   const [query, setQuery] = useState('');
   const router = useRouter();
   const searchParams = useSearchParams()

   const handleSearch = (e: any) => {
      e.preventDefault();
      // Programmatically push to the URL with search params
      const params = new URLSearchParams(window.location.search);
      params.set("search", query)
      router.push(`?${params.toString()}`)
   };
   console.log(query)
   return (
      // bg-[#FDFFFC]
      <div className="w-full h-[5rem] flex justify-between items-center px-5 lg:px-10 text-black ">
         <a href="http://" target="_blank" rel="noopener noreferrer">Yield</a>
         <form action='' method='' onSubmit={handleSearch} className="w-[50vw] lg:w-[40vw] h-[2.5rem] rounded-md bg-gray-300 overflow-hidden flex  border border-gray-200 focus:border-gray-300 relative z-[0]
   ">

               <input type="search" name="ens" id="" className="w-full h-full px-2 outline-none text-black bg-white " placeholder="ens.base.eth" value={query} onChange={(e: any) => setQuery(e.target.value)} />
            {/* <div className='w-full h-[20rem] bg-red-300 flex absolute z-[2] bottom-0'>
            </div> */}
            <button className="h-full w-fit bg-white hover:bg-gray-300 px-3" type='submit'>
               <FaSearch fontSize={16} className="hover:cursor-pointer" />
            </button>
         </form>
         <div className="flex gap-5 items-center">
            <LiquidateModal />
            <ConnectButton />
         </div>
      </div>
   )
}

export default Navbar