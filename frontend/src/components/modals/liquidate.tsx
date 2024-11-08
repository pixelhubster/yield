"use client"
import React, { useEffect, useState } from 'react'
import InputWithLabel from '../cards/inputWithLabel'
import { yieldLendingContract } from '@/backend/web3'
import { useAccount } from 'wagmi'
import CustomButton from '../cards/button'
import { useSmartAccount } from '@particle-network/connectkit'

const LiquidateModal = ({ id }: { id?: number | 0 }) => {
   // const account = useAccount()
   const smartAccount = useSmartAccount()
   const [address, setAddress] = useState<string>()
   const [value, setValue] = useState({
      tokenId: 0,
      borrower: ''
   })
   useEffect(() => {
      async function get() {
         const address = await smartAccount?.getAddress()
         setAddress(address)
      }
      get()
   })
   const handleChange = (e: any) => {
      setValue((value: any) => ({ ...value, [e.target.name]: e.target.value }))
   }
   const handleClick = async () => {
      try {
         // const res = await yieldLendingContract.methods.liquidate(value.tokenId, value.borrower).send({ from: address });
         const txData = await yieldLendingContract.methods.liquidate(value.tokenId, value.borrower)
         const tx = {
            to: process.env.NEXT_PUBLIC_YIELDLENDING_CONTRACT,
            value: 0,
            data: txData
         }
         return { success: true, message: "Yield Token Listed Successfully", tx, error: "Failed to List Yield Token" }
      } catch (error) {
         console.log(error)
         return { error: "Failed to List Yield Token", contractError: error }
      }
   }

   return (
      <>
         <label htmlFor="my_modal_12" className="bg-transparent border-0 text-black hover:bg-transparent shadow-0 cursor-pointer hover:underline">Liquidate</label>

         <input type="checkbox" id="my_modal_12" className="modal-toggle" />
         <div className="modal bg-white text-black" role="dialog">
            <div className="modal-box bg-white pt-2">
               <h3 className="text-lg font-bold text-center py-4">Liquidate Loan</h3>
               <InputWithLabel value='tokenId' onChange={handleChange} name='Id' placeholder='Token Id' fill={id} />
               <InputWithLabel value='borrower' onChange={handleChange} name="Borrower" placeholder='0x...00' />
               {/* <button className='btn w-full bg-blue-900/90 border-0 hover:bg-blue-900'>Liquidate</button> */}
               <CustomButton btn='Liquidate' handleClick={handleClick} />
               <p className="py-4 text-center text-[12px] text-gray-600">You will be prompted to pay for the transaction fee</p>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_12">Close</label>
         </div>
      </>
   )
}

export default LiquidateModal