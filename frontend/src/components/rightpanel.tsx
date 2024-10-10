"use client"
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import RegisterContainer from './cards/register'
import Statistics from './statistics'
const Map = dynamic(() => import("./map"), { ssr: false })

const Rightpanel = () => {
   const [mapLayer, setMapLayer] = useState<any>([])
   const [open, setOpen] = useState(false)
   const [polygon, setPolygon] = useState<any>([])
   const toPolygon = (data: any) => {
      const newArray: any = [];
      // console.log(data)
      data.map((l: any, index: number) => {
         const array: any = []
         l.latlngs.map((latlng: any, index: number) => {
            array.push([latlng.lat, latlng.lng])
         })
         newArray.push([...array, array[0]])
      });
      return newArray
   }
   useEffect(() => {
      setPolygon(toPolygon(mapLayer))
   }, [mapLayer])
   return (
      <div className="h-full flex flex-col p-5 flex-1 overflow-auto ">
         <div className="h-full rounded-xl border border-black overflow-hidden relative flex items-center ">
            <Map openfn={setOpen} mapLayer={mapLayer} setMapLayer={setMapLayer} toPolygon={toPolygon} />
            {open && <RegisterContainer polygon={polygon} />}
         </div>
         <Statistics />
      </div>
   )
}

export default Rightpanel