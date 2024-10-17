"use client"
import queryContract, { convertTimestampToDate } from '@/app/context/query'
import { sortExplorer } from '@/app/context/sort'
import { gql } from 'graphql-request'
import React, { useEffect, useState } from 'react'

const History = ({ id }: { id?: number }) => {
   const [data, setData] = useState<any>([])
   useEffect(() => {
      const get = async () => {
         const query = gql`
         {
  yieldMinteds(where: {yieldId: ${id}}) {
    amount
    blockNumber
    blockTimestamp
    id
    landTokenId
    owner
    transactionHash
    yieldId
    yieldType
  }
  yieldLoaneds(where: {yieldId: ${id}}) {
    blockNumber
    blockTimestamp
    borrower
    id
    liquidationThreshold
    loanAmount
    transactionHash
    yieldAmount
    yieldId
  }
  yieldListeds(where: {yieldId: ${id}}) {
    yieldId
    transactionHash
    pricePerShare
    listId
    id
    blockTimestamp
    blockNumber
    amount
  }
  sharePurchaseds(where: {yieldId: ${id}}) {
    amount
    blockNumber
    blockTimestamp
    id
    listId
    transactionHash
    yieldId
  }
  loanRepayeds(where: {yieldId: ${id}}) {
    blockNumber
    blockTimestamp
    borrower
    id
    transactionHash
    yieldAmount
    yieldId
  }
  loanLiquidateds(where: {yieldId: ${id}}) {
    blockNumber
    blockTimestamp
    borrower
    id
    transactionHash
    yieldId
  }
  burnYields(where: {yieldId: ${id}}) {
    amount
    blockNumber
    blockTimestamp
    id
    transactionHash
    owner
    yieldId
  }
}`
         const history = await queryContract(query)
         console.log(history)
         if (history.success) {
            const sorted = sortExplorer(history.data)
            setData(sorted)
         }
      }
      get()
   }, [id])
   return (
      <div className="w-full h-full text-black bg-gray-400 shadow-lg rounded-lg p-2 py-5 overflow-x-hidden custom-scroll">
         {data.map((log: any, key: number) => (
            <div key={key} className='w-full bg-white px-4 py-2 text-[12px] my-1 rounded-md'>
               <div className='w-full flex justify-between items-center'>{log.method}
                  <i>
                     {convertTimestampToDate(log.blockTimestamp)}
                  </i>
               </div>
               <div className='gap-2 flex flex-shrink py-1'>
                  <i className='shrink-0'>
                     {log.type}
                  </i>
                  <a href={`  ${log.transactionhash}`}className='overflow-hidden text-blue-600 underline flex text-ellipsis line-clamp-1'>{log.transactionHash}</a>
               </div>
            </div>
         )
         )}
         {data.length == 0 && <div className='w-full h-full flex justify-center items-center text-sm'>No history available</div>}

      </div>
   )
}

export default History