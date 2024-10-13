"use client"
import React, { useCallback, useEffect, useState } from 'react'
import InputWithLabel from '../cards/inputWithLabel'
import CustomButton from '../cards/button'
import { useAccount } from 'wagmi'
import { yieldTokenContract } from '@/backend/web3'
import { gql } from 'graphql-request'
import queryContract from '@/app/context/query'
import Web3 from 'web3'

const BuyYieldModal = ({ id }: { id?: number | 0 }) => {
   const account = useAccount()
   const [value, setValue] = useState({
      tokenId: 0,
      listId: 0,
      qty: 0,
      amount: 0,
   })
   const [data, setData] = useState<any>()
   const [sold, setSold] = useState<any>()
   const [skey, setKey] = useState<any>(null)
   const [price, setPrice] = useState(0)
   const handleChange = (e: any) => {
      setValue((value: any) => ({ ...value, [e.target.name]: e.target.value }))
   }
   const amountToPay = data?.yieldListeds[skey]?.pricePerShare * data?.yieldListeds[skey]?.amount
   // setPrice(data?.yieldListeds[skey]?.pricePerShare * data?.yieldListeds[skey]?.amount)
   const big = Web3.utils.toWei(BigInt(amountToPay || 0), "ether")
   console.log(big)
   const handleClick = async () => {
      try {
         console.log(data)
         const res = await yieldTokenContract.methods.buyShare(data.yieldListeds[skey].listId, data.yieldListeds[skey].yieldId, data.yieldListeds[skey].amount).send({ from: account.address, value: amountToPay });
         return { success: true, message: "Yield Token Bought Successfully" }
      } catch (error) {
         return { error: "Failed to Buy Yield Token", contractError: error }
      }
   }

   // const check = useCallback( async () => {
   //    const noble = await yieldTokenContract.methods.listSupply(id).call()
   //    console.log(noble)
   // }, [id])
   // check()
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
         // console.log(res.success)
      }
      get()
   }, [id])
   const s = sold?.sharePurchaseds.filter((element: any) => element.listId == skey) || []
   // console.log(s)
   // console.log(sold)
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
                           <a href={`#slide${key === 0 ? data.yieldListeds.length - 1 : key - 1}`} className="btn bg-white/30 border-0 backdrop btn-circle" onClick={() => setKey(key)}>❮</a>
                           <a href={`#slide${key + 2}`} className="btn btn-circle bg-white/30 border-0 backdrop" onClick={() => setKey(key + 1)}>❯</a>
                        </div>
                     </div>
                  )
                  )}
                  {/* <div id="slide2" className="carousel-item relative w-full">
                     <div className='card w-full h-[12rem] bg-[#150578] flex justify-center items-center text-white text-4xl font-semibold'>
                        <p>005 eth</p>
                        <p className='text-sm text-gray-300'>$2.3 per share</p>
                     </div>
                     <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide1" className="btn bg-white/30 border-0 backdrop btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle bg-white/30 border-0 backdrop">❯</a>
                     </div>
                  </div>
                  <div id="slide3" className="carousel-item relative w-full">
                     <div className='card w-full h-[12rem] bg-[#150578] flex justify-center items-center text-white text-4xl font-semibold'>
                        <p>90 eth</p>
                        <p className='text-sm text-gray-300'>$2.3 per share</p>
                     </div>
                     <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                        <a href="#slide2" className="btn bg-white/30 border-0 backdrop btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle bg-white/30 border-0 backdrop">❯</a>
                     </div>
                  </div> */}
               </div>
               {/* <InputWithLabel onChange={handleChange} value='tokenId' name='Id' placeholder='Token Id' fill={id} />
               <InputWithLabel onChange={handleChange} value='qty' name='Qty' placeholder='Token Quantity' fill={skey}/> */}
               <InputWithLabel onChange={handleChange} value='amount' name='Pay $' placeholder='' fill={amountToPay} />
               {/* <button className='btn w-full bg-blue-900/90 border-0 hover:bg-blue-900'>Buy</button> */}
               {s.length > 0 ? 
               <CustomButton btn='Sold' handleClick={handleClick} className='bg-green-500 disabled:bg-green-500' disabled={true}/>:
               <CustomButton btn='Buy' />
               }
               <p className="py-4 text-center text-[12px] text-gray-600">You will be prompted to pay for the transaction fee</p>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_9">Close</label>
         </div>
      </>
   )
}

export default BuyYieldModal
