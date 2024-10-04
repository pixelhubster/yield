"use client"
import React, { useState } from 'react'
import Mincard from './cards/mincard'
import Summary from './cards/summary'
import { FeatureGroup, MapContainer, Polygon, TileLayer} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L, { circle } from "leaflet"
import { EditControl } from 'react-leaflet-draw'
import { LatLngExpression } from 'leaflet'
import "leaflet-draw/dist/leaflet.draw.css"

const center: LatLngExpression = [51.515, -0.09]
const purpleOptions = { color: 'green'}
//  const polygon: LatLngExpression[] = [
//    [51.515, -0.09],
//    [51.52, -0.1],
//    [51.52, -0.12],
//  ]
const Rightpanel = () => {
   const [mapLayer, setMapLayer] = useState<any>([])
   const onCreate = (e: any)=> {
      console.log(e)
      const {layerType, layer} = e;
      if (layerType === "polygon") {
         const {_leaflet_id} = layer;
         setMapLayer( (layers: any) => [...layers, { id: _leaflet_id, latlngs: layer.getLatLngs()[0]}])
      }

   }
   const onEdited = (e: any) => {
      console.log(e);
      const { layers: { _layers} } = e;

      Object.values( _layers).map( ({ _leaflet_id, editing}: any) => {
         setMapLayer( (layers: any) => layers.map((l: any) => l.id === _leaflet_id) && {...L, latLngs: { ...editing.latLngs[0]}})
      })
   }
   const onDeleted = (e: any) => {

      console.log(e);
      const { layers: { _layers}} = e;
      Object.values(_layers).map(( {_leaflet_id}: any) => {
         setMapLayer( (layers: any) => layers.filter((l: any) => l.id !== _leaflet_id))
      })
   }
  return (
   <div className="w-full h-full bg-green-400 flex flex-col p-5">
   <div className="w-full h-full bg-white rounded-xl border border-black overflow-hidden">
      <MapContainer className='w-full' center={center} zoom={40}>
         <FeatureGroup>
            <EditControl position="topright" onCreated={onCreate} onEdited={onEdited} onDeleted={onDeleted}
            draw={{
               rectangle: false,
               polyline: false,
               circle: false,
               circlemarker: false,
               marker: false
            }}
             />
         </FeatureGroup>
         <TileLayer
             attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg'
         // url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
      </MapContainer>
         {/* <Polygon pathOptions={purpleOptions} positions={polygon} /> */}
   </div>
   
   <div className="w-full h-[18rem] bg-yellow-200 mt-5 p-2 flex gap-3 overflow-auto">
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