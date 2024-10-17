"use client"
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { Suspense, useCallback, useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import LiquidateModal from './modals/liquidate'
import { TiThMenuOutline } from "react-icons/ti";
import { useEnsResolver } from 'wagmi'
import { normalize } from 'viem/ens'
import { config } from '@/app/context/ensConfig'
import { getEnsAddress } from '@wagmi/core'
import { Leaf } from 'lucide-react'

const Navbar = () => {
   const [query, setQuery] = useState<string>('');
   const router = useRouter();
   const [filteredSuggestions, setFilteredSuggestions] = useState<String[]>([]); // Filtered suggestions for display
   const inputTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for storing the timeout ID

   const params = new URLSearchParams(window.location.search);
   const handleSearch = (e: any) => {
      e.preventDefault();
      // Programmatically push to the URL with search params
      params.set("search", query)
      router.push(`?${params.toString()}`)
   };
   const toggle = () => {
      // const value = params.get("tab") || false
      params.set("tab", String(true))
      router.push(`?${params.toString()}`)
      // console.log(value)
   }
   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;  // Get the current input value
      setQuery(value);

      if (inputTimeoutRef.current) {
         clearTimeout(inputTimeoutRef.current);
      }

      inputTimeoutRef.current = setTimeout(async () => {
         try {
            const res = await getEnsAddress(config, {
               name: normalize(value),
            });
            console.log(res);

            if (value) {
               const filtered = [res || ""];
               setFilteredSuggestions(filtered);
            } else {
               setFilteredSuggestions([]);
            }
         } catch (error) {
            console.error("Error fetching ENS address:", error);
         }
      }, 100);
   };
   return (
      // bg-[#FDFFFC]
      <div className="w-full h-[5rem] flex justify-between items-center px-5 lg:px-10 text-black relative">

         <div className='flex gap-2 justify-center items-center'>

            {/* <TiThMenuOutline fontSize={25} className='hover:cursor-pointer' onClick={toggle} /> */}
            <Leaf className="h-6 w-6 m-0 text-green-600" />
            <a href="" rel="noopener noreferrer" className='mx-0 text-green-600 font-semibold'>Yield</a>
         </div>
         <form action='' method='' onSubmit={handleSearch} className="w-[50vw] lg:w-[40vw] h-[2.5rem] rounded-md bg-gray-00 flex  border border-gray-00 focus:border-gray-00 relative max-sm:hidden overflow-hidden mx-4
         ">

            <input type="search" name="ens" id="" className="w-full h-full px-2 outline-none text-black focus-within:text-black bg-white peer/active" autoComplete='off' placeholder="land id" value={query} onChange={handleInputChange} />
            <button className="h-full w-fit bg-white hover:bg-gray-300 px-3" type='submit'>
               <FaSearch fontSize={16} className="hover:cursor-pointer" />
            </button>
            {/* <Suspense fallback={<div className="skeleton h-32 w-32"></div>}>
               {filteredSuggestions.length > 0 &&
                  <ul className="absolute top-[2.1rem] left-0 z-[40] bg-white border border-gray-300 mt-1 w-[50vw] lg:w-[40vw] border-t-0 max-h-60 overflow-y-auto custom-scroll peer-focus-within/active:block  hidden text-sm text-gray-600 ">
                     {filteredSuggestions.map((suggestion, index) => (
                        <li
                           key={index}
                           className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                           onClick={handleSearch} // Set query on click
                        >
                           {suggestion}
                        </li>
                     ))}
                  </ul>
               }
            </Suspense> */}
         </form>
         <div className="flex gap-5 items-center">
            <LiquidateModal />
            <ConnectButton />
         </div>
      </div>
   )
}

export default Navbar