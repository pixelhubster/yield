"use client"
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Statistics from './statistics'
import { useSearchParams } from 'next/navigation'
const Map = dynamic(() => import("./map"), { ssr: false })

const Rightpanel = () => {
   const searchParams = useSearchParams()
   const id = searchParams.get("search")

   return (
      <div className="h-full flex flex-col p-5 flex-1 overflow-auto ">
         <div className="h-full rounded-xl border border-black overflow-hidden relative flex items-center">
            <Map />
         </div>
         <Statistics id={Number(id)}/>
      </div>
   )
}

export default Rightpanel