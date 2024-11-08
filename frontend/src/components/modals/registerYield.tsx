"use client"
import React, { useEffect, useState } from 'react'
import InputWithLabel from '../cards/inputWithLabel'
import CustomButton from '../cards/button'
import { yieldTokenContract } from '@/backend/web3'
import { isAllValuesFilled } from '@/app/context/query'

const RegisterYieldModal = ({id}: {id?: number}) => {
   console.log(id)
   const [value, setValue] = useState({
      tokenId: id,
      yieldType: "",
      season: "",
      totalYield: "",
      amount: ""
   })
   const handleChange = (e: any) => {
      setValue((value: any) => ({ ...value, [e.target.name]: e.target.value }))
   }
   const handleRegister = async () => {
      if (!isAllValuesFilled(value)) return { sucess: false, error: "Some fields are empty"}
      try {
         // const res = await yieldTokenContract.methods.mintYield(value.tokenId, value.yieldType, value.season,value.totalYield, value.amount).send({ from: account.address});
         const txData = await yieldTokenContract.methods.mintYield(value.tokenId, value.yieldType, value.season,value.totalYield, value.amount).encodeABI();
         const tx = {
            to: process.env.NEXT_PUBLIC_YIELDTOKEN_CONTRACT,
            value: 0,
            data: txData
         }
         // console.log(res)
         return { success: true, message: "Yield Registered Successfully", tx, error: "Failed to Register Yield" }
      } catch (error) {
         return { error: "Failed to Register Yield", contractError: error}
      }
   }
   return (
      <>
         <label htmlFor="my_modal_7" className="btn bg-white text-black border-gray-100 hover:bg-gray-100 flex-1">Register Yield</label>

         <input type="checkbox" id="my_modal_7" className="modal-toggle" />
         <div className="modal bg-white text-black" role="dialog">
            <div className="modal-box bg-white pt-2">
               <h3 className="text-lg font-bold text-center py-4">Register Yield</h3>
               {/* <InputWithLabel key={33} value='landId' name='Land Id' placeholder='Token Id' onChange={handleChange} fill={id} /> */}
               <InputWithLabel value='yieldType' name='Yield Type' placeholder='e.g crop, maize' onChange={handleChange}/>
               <InputWithLabel value='season' name='Season' placeholder='months to harvest ' onChange={handleChange}/>
               <InputWithLabel value='totalYield' name='Total Yield' placeholder='e.g amount of expected yield ' onChange={handleChange}/>
               <InputWithLabel value='amount' name='Mint Amount' placeholder='e.g Total yield token minted' onChange={handleChange}/>
               <CustomButton btn='Register' handleClick={handleRegister}/>
               <p className="py-4 text-center text-[12px] text-gray-600">You will be prompted to pay for the transaction fee</p>
            </div>
            <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
         </div>
      </>
   )
}

export default RegisterYieldModal