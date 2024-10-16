"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { FeatureGroup, MapContainer, Marker, Polygon, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L, { circle, polygon } from "leaflet"
import { EditControl } from 'react-leaflet-draw'
import { LatLngExpression } from 'leaflet'
import "leaflet-draw/dist/leaflet.draw.css"
import RegisterContainer from './cards/register'
import { gql, request } from 'graphql-request'
import queryContract from '@/app/context/query'
import { useSearchParams } from 'next/navigation'

// const center: LatLngExpression = [51.5680403, -0.0509105]
const purpleOptions = { color: 'green' }
// const multiPolygon: LatLngExpression[][] = [
//    [
//       [51.56804038777301, -0.05091057373268316],
//       [51.571776185471094, -0.04807836076754946],
//       [51.56738659161304, -0.04428062065522154],
//       [51.56709304742174, -0.04428062065522154],
//       [51.566172373800846, -0.048207097720507366]
//    ]
// ]

const Map = () => {
   const [mapLayer, setMapLayer] = useState<any>([])
   const [open, setOpen] = useState(false)
   const [polygons, setPolygons] = useState<any>([])
   const search = useSearchParams()
   const center: LatLngExpression = search.get("lat") && search.get("lon") ? [Number(search.get("lat")), Number(search.get("lon"))] :  [51.5680403, -0.0509105]
   const query = gql`{
      registereds {
      id
      owner
      tokenURI
      tokenId
      coordinates
      transactionHash
      }
    }`
   const toPolygon = (data: any) => {
      const newArray: any = [];
      data.map((l: any, index: number) => {
         const array: any = []
         l.latlngs.map((latlng: any, index: number) => {
            array.push([latlng.lat, latlng.lng])
         })
         newArray.push([...array, array[0]])
      });
      return newArray
   }

   const getCoordinates = useCallback(async () => {
      try {
         const res: any = await queryContract(query);
         const newList: LatLngExpression[] = []
         const newCords = res.data.registereds.map((element: any) => {
            const newData = element.coordinates.split(",")
            const transformedData =
               newData.reduce((acc: any, value: any, index: any, array: any) => {
                  if (index % 2 === 0) {
                     acc.push([parseFloat(array[index]), parseFloat(array[index + 1])]);
                  }
                  return acc;
               }, []);
               newList.push(transformedData)
         }
         );
         setPolygons(newList);
      } catch (error) {
         console.error("Error fetching coordinates:", error);
      }
   }, [query]);
   useEffect(() => {
      getCoordinates();
      if (mapLayer.length !== 0) setOpen(true)
      else setOpen(false)
   }, [mapLayer, setOpen, query, getCoordinates])
   toPolygon(mapLayer)
   const onCreate = (e: any) => {
      console.log(e)
      const { layerType, layer } = e;
      if (layerType === "polygon") {
         const { _leaflet_id } = layer;
         setMapLayer((layers: any) => [...layers, { id: _leaflet_id, latlngs: layer.getLatLngs()[0] }]);
      }

   }
   const onEdited = (e: any) => {
      console.log(e);
      const { layers: { _layers } } = e;

      Object.values(_layers).map(({ _leaflet_id, editing }: any) => {
         setMapLayer((layers: any) => layers.map((l: any) => l.id === _leaflet_id) && { ...L, latLngs: { ...editing.latLngs[0] } })
      })
   }
   const onDeleted = (e: any) => {

      console.log(e);
      const { layers: { _layers } } = e;
      Object.values(_layers).map(({ _leaflet_id }: any) => {
         setMapLayer((layers: any) => layers.filter((l: any) => l.id !== _leaflet_id))
      })
   }
   return (
      <>
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
            </FeatureGroup>
            <TileLayer
               attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
               url='https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg'
               zIndex={10}
            // url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Polygon pathOptions={purpleOptions} positions={polygons} />
         </MapContainer>
         {open &&
            <div className='w-[30rem] h-[90%] absolute bg-white z-[30] rounded-xl drop-shadow-xl right-5'>
               <RegisterContainer polygon={toPolygon(mapLayer)} setOpen={setOpen} />
            </div>
         }
      </>
   )
}

export default Map