"use client"
import queryContract from '@/app/context/query'
import { gql } from 'graphql-request'
import React, { useEffect } from 'react'

const History = ({ id }: { id?: number }) => {
   useEffect(() => {
      const get = async () => {

         const query = gql``
         const history = await queryContract(query)
      }
      get()
   }, [id])
   return (
      <div className="w-full h-full text-black bg-gray-400 shadow-lg rounded-lg p-2 py-5 overflow-x-hidden custom-scroll">

      </div>
   )
}

export default History