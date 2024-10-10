"use client"
import React, { useEffect, useState } from 'react';
import { CiLocationArrow1 } from "react-icons/ci";
import { GiIsland } from "react-icons/gi";
import { GiFarmer } from "react-icons/gi";


const LandParcel = ({ id }: { id?: number }) => {
   const [parcel, setParcel] = useState<any>(
      {
         id: '',
         tokenUri: '',
         ipfsdata: {
            ownershipType: '',
            landName: "",
            landDeedNumber: '',
            ownerName: '',
            coordinates: [0,0],
            id: '',
            geo_json: { type: '', properties: {}, geometry: '' },
            name: "",
            center: [0, 0],
            area: 0,
            user_id: '0',
            created_at: 0,
            weather: {
               dt: 0,
               weather: [{}],
               main: [{}],
               wind: [{}],
               clouds: [{}]
            },
            dt: 0,
            t10: 0,
            moisture: 0,
            t0: 0
         },
         // data: {
            dt: 0,
            t0: 0,
            t10: 0,
            moisture: 0,
            weather: {
               dt: 0,
               clouds: { all: 0 },
               weather: {
                  id: 0,
                  dt: 0,
                  main: 0,
                  icon: 0,
                  description: 0
               },
               main: {
                  temp_min: 0,
                  temp_max: 0,
                  temp: 0,
                  pressure: 0,
               },
               wind: {
                  speed: 0,
                  deg: 0
               }
            }
         // }

      })
   const getYieldInfo = async (id?: number) => {
      const res = await fetch(`/api/register?id=${id}`);
      const data = await res.json()
      // console.log(data)
      if (!data.error) setParcel({ ...data, data: {}, ...data.data[id ?? 0] })
   }
   useEffect(() => {
      getYieldInfo(id)
   }, [id])
   return (
      <div className="w-full h-full text-black shadow-lg rounded-lg p-2 py-5 overflow-x-hidden custom-scroll">
         {/* <h2 className="text-2xl font-bold mb-4 text-center">Land Parcel Information</h2> */}

         {/* Owner and ID */}
         {/* <div className="border-b pb-4 mb-4">
        <p><span className="font-semibold">Land ID:</span> {parcel.landID}</p>
        <p><span className="font-semibold">Current Owner:</span> {parcel.owner}</p>
      </div> */}

         {/* Location */}
         <div className="w-full pb-4 mb-4 p-5 bg-gray-100 rounded-xl">
            <h3 className="text-md font-semibold mb-2 text-center">Location</h3>
            <div className='flex'>

               {/* <div className='px-4'>
                  <CiLocationArrow1 fontSize={40} />
               </div> */}
               <div className='text-[14px]'>
                  <p><span className="font-semibold">Land Name:</span> {parcel.ipfsdata.landName}</p>
                  <p><span className="font-semibold">Owner Name:</span> {parcel.ipfsdata.ownerName}</p>
                  <p><span className="font-semibold">Ownership:</span> {parcel.ipfsdata.ownershipType}</p>
                  <p><span className="font-semibold">Land Deed:</span> {parcel.ipfsdata.landDeedNumber}</p>
                  <p><span className="font-semibold">Created At:</span> {parcel.ipfsdata.created_at}</p>
                  <p><span className="font-semibold">Coordinates:</span> {parcel.ipfsdata.coordinates}</p>
                  <p><span className="font-semibold">Latitude:</span> {parcel.ipfsdata.center[0]} </p>
                  <p><span className="font-semibold">Longitude:</span>  {parcel.ipfsdata.center[1]}</p>
                  <p><span className="font-semibold">Size in Acres:</span>  {parcel.ipfsdata.area}</p>

               </div>
            </div>
         </div>

         {/* Fertility and Climate */}
         <div className="pb-4 mb-4 bg-gray-100 p-5 rounded-xl">
            <h3 className="text-md font-semibold mb-2 text-center">Soil Conditions</h3>

            <div className='flex'>
               <div className='px-4'>
                  <GiIsland fontSize={40} />
               </div>
               <div className='text-[14px]'>
                  {/* <p><span className="font-semibold">Fertility Score:</span> {parcel.fertilityScore}</p>
        <p><span className="font-semibold">Soil Type:</span> {parcel.soilType}</p> */}
                  <p><span className="font-semibold">Updated at:</span> {parcel.dt}</p>
                  {/* <p><span className="font-semibold">Average Temperature:</span> {parcel.climateData.averageTemperature} °C</p> */}
                  <p><span className="font-semibold">Average Rainfall:</span> {parcel.t0} mm</p>
                  <p><span className="font-semibold">Surface Temperature:</span> {parcel.t0} K</p>
                  <p><span className="font-semibold">Temperature (10cm depth):</span> {parcel.t10} K</p>
                  <p><span className="font-semibold">Soil Moisture:</span> {parcel.moisture} m3/m3</p>

               </div>
            </div>
         </div>


         {/* Weather */}
         <div className="pb-4 mb-4 bg-gray-100 p-5 rounded-xl">
            <h3 className="text-md font-semibold mb-2 text-center">Weather Conditions</h3>

            <div className='flex'>
               <div className='px-4'>
                  <GiIsland fontSize={20} />
               </div>
               <div className='text-[14px]'>
                  {/* <p><span className="font-semibold">Fertility Score:</span> {parcel.fertilityScore}</p>
        <p><span className="font-semibold">Soil Type:</span> {parcel.soilType}</p> */}
                  <p><span className="font-semibold">Updated At:</span> {parcel.weather.dt}</p>
                  <p><span className="font-semibold">Weather Id:</span> {parcel.weather.weather.id}</p>
                  <p><span className="font-semibold">Clouds:</span> {parcel.weather.clouds.all} %</p>
                  <p><span className="font-semibold">Clouds:</span> {parcel.weather.weather.main} °C</p>
                  <p><span className="font-semibold">Icon:</span> {parcel.weather.weather.icon} °C</p>
                  <p><span className="font-semibold">Weather Description:</span> {parcel.weather.weather.description} mm</p>
                  <p><span className="font-semibold">Temperature:</span> {parcel.weather.main.temp} K</p>
                  <p><span className="font-semibold">Min Temperature:</span> {parcel.weather.main.temp_min} K</p>
                  <p><span className="font-semibold">Max Temperature:</span> {parcel.weather.main.temp_max} K</p>
                  <p><span className="font-semibold">Atmospheric Pressure (sea level/grnd level):</span> {parcel.weather.main.pressure} hPa</p>
                  <p><span className="font-semibold">Sea level (sea level/grnd level):</span> {parcel.weather.main.sea_level} hPa</p>
                  <p><span className="font-semibold">Grnd level (sea level/grnd level):</span> {parcel.weather.main.grnd_level} hPa</p>
                  <p><span className="font-semibold">Wind Speed:</span> {parcel.weather.wind.speed} m/sec</p>
                  <p><span className="font-semibold">Wind Deg:</span> {parcel.weather.wind.deg} degree</p>
                  <p><span className="font-semibold">Humility:</span> {parcel.weather.main.pressure} K</p>
               </div>
            </div>
         </div>

         {/* Land History */}
         {/* <div className="border-b pb-4 mb-4 bg-gray-100">
        <h3 className="text-xl font-semibold mb-2">Land History</h3>
        {parcel.landHistory.map((history, index) => (
          <div key={index} className="mb-2">
            <p><span className="font-semibold">Previous Owner:</span> {history.previousOwner}</p>
            <p><span className="font-semibold">Ownership Start:</span> {history.ownershipStartDate}</p>
            <p><span className="font-semibold">Ownership End:</span> {history.ownershipEndDate}</p>
          </div>
        ))}
      </div> */}

         {/* Crop Data */}
         {/* <div className="pb-4 mb-4 bg-gray-100 p-5 rounded-xl">
            <h3 className="text-md font-semibold mb-2 text-center">Crop Data</h3>
            <div className='flex'>
               <div className='px-4'>
                  <GiFarmer fontSize={40} />
               </div>
               <div className='text-[14px]'>
                  {parcel.cropData.map((crop: any, index: any) => (
                     <div key={index} className="mb-2">
                        <p><span className="font-semibold">Crop Type:</span> {crop.cropType}</p>
                        <p><span className="font-semibold">Planting Date:</span> {crop.plantingDate}</p>
                        <p><span className="font-semibold">Harvest Date:</span> {crop.harvestDate}</p>
                        <p><span className="font-semibold">Yield Amount:</span> {crop.yieldAmount} kg</p>

                        <h4 className="font-semibold mt-2">Investment Data</h4>
                        {crop.investmentData.map((investment: any, invIndex: any) => (
                           <div key={invIndex} className="">
                              <p><span className="font-semibold">Investor:</span> {investment.investor}</p>
                              <p><span className="font-semibold">Investment Amount:</span> {investment.investmentAmount} USD</p>
                              <p><span className="font-semibold">Investment Date:</span> {investment.investmentDate}</p>
                           </div>
                        ))}
                     </div>
                  ))}
               </div>
            </div>
         </div> */}

         {/* Loans */}
         {/* <div className="pb-4 mb-4 bg-gray-100 p-5 rounded-xl">
            <h3 className="text-md font-semibold mb-2 text-center">Loans & Mortgages</h3>
            <div className='flex'>
               <div className='px-4'>
                  <GiIsland fontSize={40} />
               </div>
               <div className='text-[14px]'>
                  {parcel.mortgagesAndLoans.map((loan: any, index: any) => (
                     <div key={index} className="mb-2">
                        <p><span className="font-semibold">Lender:</span> {loan.lender}</p>
                        <p><span className="font-semibold">Loan Amount:</span> {loan.loanAmount} USD</p>
                        <p><span className="font-semibold">Loan Start Date:</span> {loan.loanStartDate}</p>
                        <p><span className="font-semibold">Loan End Date:</span> {loan.loanEndDate}</p>
                        <p><span className="font-semibold">Collateral:</span> {loan.collateral}</p>
                     </div>
                  ))}
               </div>
            </div>
         </div> */}
      </div>
   );
};

export default LandParcel;
