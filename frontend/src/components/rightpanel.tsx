"use client"
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import RegisterContainer from './cards/register'
import Statistics from './statistics'
const Map = dynamic(() => import("./map"), { ssr: false })

const Rightpanel = () => {
   return (
      <div className="h-full flex flex-col p-5 flex-1 overflow-auto ">
         <div className="h-full rounded-xl border border-black overflow-hidden relative flex items-center">
            <Map />
         </div>
         <Statistics />
      </div>
   )
}

export default Rightpanel