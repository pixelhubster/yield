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
   <div className="w-full h-[5rem] bg-black flex justify-between items-center px-5 lg:px-10">
   <a href="http://" target="_blank" rel="noopener noreferrer">Yield</a>
   {/* <div className="w-[50vw] lg:w-[40vw] h-[2.5rem] rounded-md bg-gray-300 overflow-hidden flex
   "> */}
      <form action='' method='' onSubmit={handleSearch} className="w-[50vw] lg:w-[40vw] h-[2.5rem] rounded-md bg-gray-300 overflow-hidden flex
   ">

      <input type="search" name="ens" id="" className="w-full h-full px-2 outline-none focus:border-2 focus:border-blue-300 focus:border-solid text-white" placeholder="ens.base.eth" value={query} onChange={(e: any) => setQuery(e.target.value)}/>
      <button className="h-full w-fit bg-white hover:bg-gray-300 px-3" type='submit'>
         <FaSearch fontSize={16} className="hover:cursor-pointer" />
      </button>
      </form>
   {/* </div> */}
   <div className="flex gap-5 items-center">
      <div className="flex justify-center items-center">
         <FaSearch fontSize={16} className="hover:cursor-pointer" />
      </div>
      {/* <a href="http://" target="_blank" rel="noopener noreferrer">Marketplace</a> */}
      {/* <a href="http://" target="_blank" rel="noopener noreferrer">History</a> */}
      <a href="http://" target="_blank" rel="noopener noreferrer">Lending</a>
      <LiquidateModal />
      {/* <div className="bg-red-300">connectbtn</div> */}
      <ConnectButton />
   </div>
</div>
  )
}

export default Navbar