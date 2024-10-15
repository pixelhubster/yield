"use client"
import React, { useState } from 'react'
// import InputWithLabel from '../cards/inputWithLabel'
// import CustomButton from '../cards/button'
// import { web3, yieldLendingContract, yieldTokenContract } from '@/backend/web3'
// import { useAccount } from 'wagmi'
// import { stringToBytes } from 'viem'
// import Web3 from 'web3'
import { Input } from '../ui/input'
import {Label} from "../ui/label"
import { Button } from '../ui/button'
import InputWithLabel from '../cards/inputWithLabel'
import CustomButton from '../cards/button'
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
 } from "@/components/ui/dialog";

const LiquidateModal = ({ id }: { id?: number }) => {
   // const [formData,setFormData] = useState<any>({})
   const [value,setValue] = useState<any>("")

   const handleChange = (e: any) => {
      setValue((value: any) => ({ ...value, [e.target.name]: e.target.value }))
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
            <CustomButton btn='Liquidate' />
            <p className="py-4 text-center text-[12px] text-gray-600">You will be prompted to pay for the transaction fee</p>
         </div>
         <label className="modal-backdrop" htmlFor="my_modal_12">Close</label>
      </div>
   </>
   )
}

export default LiquidateModal