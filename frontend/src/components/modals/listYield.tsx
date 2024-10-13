"use client"
import React, { useState } from 'react'
import InputWithLabel from '../cards/inputWithLabel'
import CustomButton from '../cards/button'
import { yieldTokenContract } from '@/backend/web3'
import { useAccount } from 'wagmi'

const ListYield = ({id}: {id?: number}) => {
   const account = useAccount()
   const [value, setValue] = useState({
      tokenId: 0,
      qty: 0,
      pricePerShare: 0
   })
   const handleChange = (e: any) => {
      setValue((value: any) => ({ ...value, [e.target.name]: e.target.value }))
   }
   const handleClick = async () => {
      try {
         const res = await yieldTokenContract.methods.listTokenForSale(value.tokenId, value.qty, value.pricePerShare).send({ from: account.address});
         return { success: true, message: "Yield Token Listed Successfully"}
      } catch (error) {
         return { error: "Failed to List Yield Token", contractError: error}
      }
   }
   return (
      <>
         <label htmlFor="my_modal_8" className="btn bg-white text-black border-gray-100 hover:bg-gray-100 flex-1">List</label>

         <input type="checkbox" id="my_modal_8" className="modal-toggle" />
         <div className="modal bg-white text-black" role="dialog">
            <div className="modal-box bg-white pt-2">
               <h3 className="text-lg font-bold text-center py-4">List Yield Token</h3>
               <InputWithLabel value='tokenId' name='Id' placeholder='Token Id' onChange={handleChange} fill={id}/>
               <InputWithLabel value='qty' name='Qty' placeholder='Token Quantity' onChange={handleChange} />
               <InputWithLabel value='pricePerShare' name='$' placeholder='Price per share' onChange={handleChange}/>
               {/* <button className='btn w-full bg-blue-900/90 border-0 hover:bg-blue-900'>Complete</button> */}
               <CustomButton btn='Complete' handleClick={handleClick}/>
               <p className="py-4 text-center text-[12px] text-gray-600">You will be prompted to pay for the transaction fee</p>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_8">Close</label>
         </div>
      </>
   )
}

export default ListYield