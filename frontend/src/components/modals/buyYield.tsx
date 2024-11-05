"use client"
import React, { useCallback, useEffect, useState } from 'react'
import InputWithLabel from '../cards/inputWithLabel'
import CustomButton from '../cards/button'
import { yieldTokenContract } from '@/backend/web3'
import { gql } from 'graphql-request'
import queryContract from '@/app/context/query'
import Web3 from 'web3'

const BuyYieldModal = ({ id }: { id?: number | 0 }) => {
   const [data, setData] = useState<any>()
   const [sold, setSold] = useState<any>()
   const [skey, setKey] = useState<any>(0)
   let amountToPay = data?.yieldListeds[skey]?.pricePerShare * data?.yieldListeds[skey]?.amount
   const big = Web3.utils.toWei(BigInt(amountToPay || 0), "ether")
   const handleClick = async () => {
      // try {
      const txData = await yieldTokenContract.methods.buyShare(data.yieldListeds[skey].listId, data.yieldListeds[skey].yieldId, data.yieldListeds[skey].amount).encodeABI();
      console.log(txData)
      const tx = {
         to: process.env.NEXT_PUBLIC_YIELDTOKEN_CONTRACT,
         value: amountToPay,
         data: txData
      }
      // const res = await yieldTokenContract.methods.buyShare(data.yieldListeds[skey].listId, data.yieldListeds[skey].yieldId, data.yieldListeds[skey].amount).send({ from: account.address, value: amountToPay });
      return { success: true, message: "Yield Token Bought Successfully", tx, error: "Failed to Buy Yield Token" }
      // } catch (error) {
      //    return { error: "Failed to Buy Yield Token", contractError: error }
      // }
   }
   useEffect(() => {
      const query = gql`{
         yieldListeds(where: {yieldId: ${id}}) {
            amount
            blockNumber
            blockTimestamp
            id
            listId
            pricePerShare
            transactionHash
            yieldId
         }
         }`
      const queryBought = gql`{
         sharePurchaseds(where: {yieldId: ${id}}) {
            amount
            blockNumber
            blockTimestamp
            id
            listId
            transactionHash
            yieldId
         }
         }`
      async function get() {
         const res = await queryContract(query);
         const boughtRes = await queryContract(queryBought);
         if (boughtRes.success) setSold(boughtRes.data)
         if (res.success) setData(res.data)
      }
      get()
   }, [id])
   const s = sold?.sharePurchaseds.filter((element: any) => element.listId == skey) || []
   const handleNext = (id: number, limit: number) => {
      if (id >= limit - 1) return setKey(0)
      return setKey(id + 1)
   }
   const hanldePrev = (index: number, limit: number) => {
      if (index == 0) return setKey(limit - 1)
      return setKey(index - 1)
   }
   return (
      <>
         <label htmlFor="my_modal_9" className="btn bg-white text-black border-gray-100 hover:bg-gray-100 flex-1">Purchase</label>

         <input type="checkbox" id="my_modal_9" className="modal-toggle" />
         <div className="modal bg-white text-black" role="dialog">
            <div className="modal-box bg-white pt-2">
               <h3 className="text-lg font-bold text-center py-4">Purchase Yield Token</h3>

               <div className="carousel w-full">
                  {data?.yieldListeds?.map((list: any, key: any) =>
                  (
                     <div key={key} id={`slide${key}`} className="carousel-item relative w-full">
                        <div className='card w-full h-[12rem] bg-[#150578] flex justify-center items-center text-white text-4xl font-semibold'>
                           <p>{list.amount} YT</p>
                           <p className='text-sm text-gray-300'>${list.pricePerShare} per share</p>
                        </div>
                        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                           <a href={`#slide${key === 0 ? data.yieldListeds.length - 1 : key - 1}`} className="btn bg-white/30 border-0 backdrop btn-circle" onClick={() => hanldePrev(key, data.yieldListeds.length)}>❮</a>
                           <a href={`#slide${data.yieldListeds.length == key + 1 ? 0 : key + 1}`} className="btn btn-circle bg-white/30 border-0 backdrop" onClick={() => handleNext(key, data.yieldListeds.length)}>❯</a>
                        </div>
                     </div>
                  )
                  )}
               </div>

               {data?.yieldListeds?.length > 0 && s.length === 0 &&
                  <InputWithLabel onChange={() => { }} value='amount' name='Pay $' placeholder={amountToPay.toString()} fill={amountToPay} />
               }
               {data?.yieldListeds?.length > 0 && s.length > 0 &&
                  <CustomButton btn='Sold' className='bg-green-500 disabled:bg-green-500' disabled={true} />
               }
               {
                  data?.yieldListeds.length > 0 && (s.length === 0) &&
                  <CustomButton btn='Buy' handleClick={handleClick} />
               }
               {data?.yieldListeds.length === 0 &&
                  <p className="py-4 text-center text-[16px] text-gray-600">Yield not listed</p>}
               <p className="py-4 text-center text-[12px] text-gray-600">You will be prompted to pay for the transaction fee</p>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_9">Close</label>
         </div>
      </>
   )
}

export default BuyYieldModal
