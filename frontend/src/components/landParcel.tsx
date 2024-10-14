"use client"
import React, { useCallback, useEffect, useState } from 'react';
import { CiLocationArrow1 } from "react-icons/ci";
import { GiIsland } from "react-icons/gi";
import { GiFarmer } from "react-icons/gi";
import Paragraph from './cards/paragraph';
import { useRouter } from 'next/navigation';


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
            coordinates: [0, 0],
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
   const router = useRouter()
   const getYieldInfo = async (id?: number) => {
      const res = await fetch(`/api/register?id=${id}`);
      const data = await res.json()
      // console.log(data)
      if (!data.error) setParcel({ ...data, data: {}, ...data.data[id ?? 0] })
   }
   useCallback(() => {
      const params = new URLSearchParams(window.location.search);
      params.set("lat", parcel.ipfsdata.center ? parcel.ipfsdata.center[0] : 0)
      params.set("lon", parcel.ipfsdata.center ? parcel.ipfsdata.center[1] : 0)
      router.push(`?${params.toString()}`)
   }, [parcel, router])
   useEffect(() => {
      getYieldInfo(id)
   }, [id])
   console.log(parcel)
   return (
      <div className="w-full h-full text-black shadow-lg rounded-lg p-2 py-5 overflow-x-hidden custom-scroll">
         <div className="w-full pb-4 mb-4 p-5 bg-slate-300 shadow-sm rounded-xl">
            <h3 className="text-md font-semibold my-2 text-center">Location
               {/* <div className='px-4'>
                  <CiLocationArrow1 fontSize={40} />
               </div> */}
            </h3>

            <div className='text-[14px] w-full overflow-hidden'>
               <Paragraph name='Land Name' value={parcel.ipfsdata.landName} />
               <Paragraph name='Owner Name' value={parcel.ipfsdata.ownerName} />
               <Paragraph name='Ownership' value={parcel.ipfsdata.ownershipType} />
               <Paragraph name='Land Deed' value={parcel.ipfsdata.landDeedNumber} />
               <Paragraph name='Created At' value={parcel.ipfsdata.created_at} />
               <Paragraph name='Coordinates' value={parcel.ipfsdata.coordinates} />
               <Paragraph name='Latitude' value={parcel.ipfsdata.center && parcel?.ipfsdata?.center[0]} />
               <Paragraph name='Longitude' value={parcel.ipfsdata.center && parcel?.ipfsdata?.center[1]} />
               <Paragraph name='Size' value={parcel?.ipfsdata?.area || 0} />
            </div>
         </div>

         {/* Fertility and Climate */}
         <div className="pb-4 mb-4 bg-slate-300 p-5 rounded-xl">
            <h3 className="text-md font-semibold text-center my-2">Soil Conditions</h3>

            {/* <div className='px-4'>
                  <GiIsland fontSize={40} />
               </div> */}
            <div className='text-[14px]'>
               <Paragraph name='Updated at' value={parcel.dt || 0} />
               <Paragraph name='Average Rainfall' value={`${parcel.t0 || 0} mm`} />
               <Paragraph name='Surface Temperature' value={`${parcel.t0 || 0} K`} />
               <Paragraph name='Temperature' value={`${parcel.t10 || 0} K`} />
               <Paragraph name='Soil Moisture' value={`${parcel.moisture || 0} m3/m3`} />
            </div>
         </div>


         {/* Weather */}
         <div className="pb-4 mb-4 bg-slate-300 p-5 rounded-xl">
            <h3 className="text-md font-semibold my-2 text-center">Weather Conditions</h3>

            {/* <div className='px-4'>
                  <GiIsland fontSize={20} />
               </div> */}
            <div className='text-[14px]'>
               <Paragraph name='Updated At' value={`${parcel.weather.dt}`} />
               <Paragraph name='Weather Id' value={`${parcel?.weather?.weather[0]?.id || ''}`} />
               <Paragraph name='Clouds' value={`${parcel.weather.clouds.all} %`} />
               <Paragraph name='Feels like' value={`${parcel.weather.main.feels_like || 0} `} />
               <Paragraph name='Clouds' value={`${parcel?.weather?.weather[0]?.main || ''} `} />
               <Paragraph name='Icon' value={`${parcel?.weather?.weather[0]?.icon || 0}`} />
               <Paragraph name='Weather Description' value={`${parcel?.weather?.weather[0]?.description || 0}`} />
               <Paragraph name='Temperature' value={`${parcel.weather.main.temp} K`} />
               <Paragraph name='Min Temperature' value={`${parcel.weather.main.temp_min} K`} />
               <Paragraph name='Max Temperature' value={`${parcel.weather.main.temp_max} K`} />
               <Paragraph name='Atmospheric Pressure' value={`${parcel.weather.main.pressure} hPa`} />
               <Paragraph name='Sea level' value={`${parcel.weather.main.sea_level || ''} hPa`} />
               <Paragraph name='Grnd Level' value={`${parcel.weather.main.grnd_level || ''} hPa`} />
               <Paragraph name='Wind Speed' value={`${parcel.weather.wind.speed} m/sec`} />
               <Paragraph name='Wind Deg' value={`${parcel.weather.wind.deg}  degree`} />
               <Paragraph name='Humidity' value={`${parcel.weather.main.pressure} K`} />
            </div>
         </div>
      </div>
   );
};

export default LandParcel;
