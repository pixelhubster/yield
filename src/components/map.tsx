"use client"
import React, { useEffect, useState } from 'react'
import { FeatureGroup, MapContainer, Polygon, TileLayer} from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L, { circle } from "leaflet"
import { EditControl } from 'react-leaflet-draw'
import { LatLngExpression } from 'leaflet'
import "leaflet-draw/dist/leaflet.draw.css"
import dynamic from 'next/dynamic'

const center: LatLngExpression = [51.5680403, -0.0509105]
const purpleOptions = { color: 'green'}
 const multiPolygon: LatLngExpression[][] = [
   [
     [ 51.56804038777301, -0.05091057373268316 ],
     [ 51.571776185471094, -0.04807836076754946 ],
     [ 51.56738659161304, -0.04428062065522154 ],
     [ 51.56709304742174, -0.04428062065522154 ],
     [ 51.566172373800846, -0.048207097720507366 ]
   ]
 ]
const Map = ({ openfn, setMapLayer, mapLayer, toPolygon} : {openfn?: Function, setMapLayer: Function, mapLayer: any, toPolygon: Function}) => {
   // const [mapLayer, setMapLayer] = useState<any>([])
   const [polygon, setPolygon] = useState<any>()

   useEffect(() => {
      if (mapLayer.length !== 0) (openfn as Function)(true)
      else (openfn as Function)(false)
   }, [mapLayer])
   toPolygon(mapLayer)
   const onCreate = (e: any)=> {
      console.log(e)
      const {layerType, layer} = e;
      if (layerType === "polygon") {
         const {_leaflet_id} = layer;
         setMapLayer( (layers: any) => [...layers, { id: _leaflet_id, latlngs: layer.getLatLngs()[0]}]);
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
   <MapContainer className='w-full' center={center} zoom={15}>
         <FeatureGroup>
            <EditControl position="topleft" onCreated={onCreate} onEdited={onEdited} onDeleted={onDeleted}
            draw={{
               rectangle: false,
               polyline: false,
               circle: false,
               circlemarker: false,
               marker: false
            }}
            />
            <button>jjj</button>
         </FeatureGroup>
         <TileLayer
             attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url='https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg'
         // url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
         />
     
         <Polygon pathOptions={purpleOptions} positions={multiPolygon} />
      </MapContainer>
  )
}

export default Map