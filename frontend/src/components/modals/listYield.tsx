"use client"
import React, { useState } from 'react'
import InputWithLabel from '../cards/inputWithLabel'
import CustomButton from '../cards/button'
import { yieldTokenContract } from '@/backend/web3'

const ListYield = ({ id }: { id?: number }) => {
   const [value, setValue] = useState({
      tokenId: 0,
      qty: 0,
      pricePerShare: 0
   })
   const handleChange = (e: any) => {
      setValue((value: any) => ({ ...value, [e.target.name]: e.target.value }))
   }
   // const handleSmth = async () => {
   //    const txData = await yieldTokenContract.methods.ownerOf(5).call({ from: "0x1D50DB44A61c62B65c8A9800000081D82a465c1c"})
   //    console.log(txData)
   // }
   // handleSmth()
   const handleClick = async () => {
      // try {
      const approvalTxData = await yieldTokenContract.methods.setApprovalForAll(yieldTokenContract.options.address, true).encodeABI()
      const approvalTx = {
         to: process.env.NEXT_PUBLIC_YIELDTOKEN_CONTRACT,
         value: 0,
         data: approvalTxData,
      }

      const txData = await yieldTokenContract.methods.listTokenForSale(id, value.qty, value.pricePerShare).encodeABI();
      const tx = {
         to: process.env.NEXT_PUBLIC_YIELDTOKEN_CONTRACT,
         value: 0,
         data: txData,
      }
      return { success: true, message: "Yield Token Listed Successfully", tx, error: "Failed to List Yield Token" }
      // } catch (error) {
      //    return { error: "Failed to List Yield Token", contractError: error}
      // }
   }
   return (
      <>
         <label htmlFor="my_modal_8" className="btn bg-white text-black border-gray-100 hover:bg-gray-100 flex-1">List</label>

         <input type="checkbox" id="my_modal_8" className="modal-toggle" />
         <div className="modal bg-white text-black" role="dialog">
            <div className="modal-box bg-white pt-2">
               <h3 className="text-lg font-bold text-center py-4">List Yield Token</h3>
               <InputWithLabel value='tokenId' name='Id' placeholder='Token Id' onChange={handleChange} fill={id} />
               <InputWithLabel value='qty' name='Qty' placeholder='Token Quantity' onChange={handleChange} />
               <InputWithLabel value='pricePerShare' name='$' placeholder='Price per share' onChange={handleChange} />
               {/* <button className='btn w-full bg-blue-900/90 border-0 hover:bg-blue-900'>Complete</button> */}
               <CustomButton btn='Complete' handleClick={handleClick} />
               <p className="py-4 text-center text-[12px] text-gray-600">You will be prompted to pay for the transaction fee</p>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_8">Close</label>
         </div>
      </>
   )
}

export default ListYield