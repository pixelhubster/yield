import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'
import { FaSearch } from 'react-icons/fa'

const Navbar = () => {
  return (
   <div className="w-full h-[5rem] bg-black flex justify-between items-center px-5 lg:px-10">
   <a href="http://" target="_blank" rel="noopener noreferrer">Yield</a>
   {/* <div>name</div> */}
   <div className="w-[50vw] lg:w-[40vw] h-[2.5rem] rounded-md bg-gray-300 overflow-hidden flex
   ">
      <input type="search" name="ens" id="" className="w-full h-full px-2 text-black outline-none focus:border-2 focus:border-blue-300 focus:border-solid" placeholder="ens.base.eth" />
      <button className="h-full w-fit bg-white hover:bg-gray-300 px-3">
         <FaSearch fontSize={16} className="hover:cursor-pointer" />
      </button>
   </div>
   <div className="flex gap-5 items-center">
      <div className="flex justify-center items-center">
         <FaSearch fontSize={16} className="hover:cursor-pointer" />
      </div>
      <a href="http://" target="_blank" rel="noopener noreferrer">Marketplace</a>
      <a href="http://" target="_blank" rel="noopener noreferrer">History</a>
      <a href="http://" target="_blank" rel="noopener noreferrer">Lending</a>
      {/* <div className="bg-red-300">connectbtn</div> */}
      <ConnectButton />
   </div>
</div>
  )
}

export default Navbar