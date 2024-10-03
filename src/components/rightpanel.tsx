"use client"
import React from 'react'
import Mincard from './cards/mincard'
import Summary from './cards/summary'
import { MapContainer, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"

const Rightpanel = () => {
  return (
   <div className="w-full h-full bg-green-400 flex flex-col p-5">
   <div className="w-full h-full bg-white rounded-xl border overflow-hidden" id="map">
      <MapContainer className='w-full h-full' center={[48.2333, 2.4445]} zoom={13}>
         <TileLayer
            //  attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
         url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
      </MapContainer>
   </div>
   <div className="w-full h-[18rem] bg-yellow-200 mt-5 p-2 flex gap-3 overflow-auto">
      {/*
         totalSupply: 10000,  // total crops grown in kg
         estimatedRevenue: 25000,  // estimated revenue from total crops in USD
         estimatedYieldPerAcre: 200,  // estimated yield per acre in kg
         investmentPotential: {
            estimatedROI: 15,  // estimated Return on Investment in percentage
            riskLevel: "Moderate",  // risk level for investors
            cropGrowthRate: 1.2  // rate of crop growth in percentage per season
         }, 
         */}
      <Summary header="Total Supply" data="23200300" className="bg-black shrink-0" />
      <Summary header="Estimated Revenue" data="23200300" className="bg-white text-black shrink-0" />
      <Summary header="Total Crops" data="23200300" className="bg-white text-black shrink-0" />
      <div className="flex flex-col gap-2">
         <Summary header="Estd ROI" data="23200300" className="bg-white text-black" />
         <Summary header="Risk Level" data="moderate" className="bg-white text-black" />
      </div>
      <div className="flex flex-col gap-2">
         <Summary header="Max Loan Amount" data="23200300" className="bg-white text-black" />
         <Summary header="Loan Interest Rate" data="23200300" className="bg-white text-black" />
      </div>

      <div className={`w-full h-full flex rounded-xl border border-black bg-black shadow-md flex-col justify-center items-center relative overflow-hidden pt-5`}>
         <div className="w-full h-full overflow-hidden flex">
            <Mincard />
            <Mincard />
         </div>
         <div className="w-full h-full overflow-hidden flex">
            <Mincard />
            <Mincard />
         </div>
         <button className="w-[96%] flex justify-center items-center shrink m-2 mx-5 bg-blue-600 p-4 rounded-xl shadow-xl">invest</button>
      </div>
   </div>
</div>
  )
}

export default Rightpanel